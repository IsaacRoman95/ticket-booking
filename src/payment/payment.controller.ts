import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from '../entities/payment.entity';
import { JsonApiInterceptor } from 'src/interceptors/json-api.interceptor';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';

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
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.paymentService.remove(id);
  }
}
