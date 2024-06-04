import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from '../entities/payment.entity';
import { JsonApiInterceptor } from 'src/interceptors/json-api.interceptor';

@Controller('payments')
@UseInterceptors(
  new JsonApiInterceptor('payment', {
    attributes: ['amount', 'paymentDate', 'created_at', 'updated_at'],
    keyForAttribute: 'camelCase',
  }),
)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  findAll(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Payment> {
    return this.paymentService.findOne(id);
  }

  @Post()
  create(@Body() payment: Payment): Promise<Payment> {
    return this.paymentService.create(payment);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payment: Payment): Promise<Payment> {
    return this.paymentService.update(id, payment);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.paymentService.remove(id);
  }
}
