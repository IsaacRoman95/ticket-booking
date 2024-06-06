import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';
import { Ticket } from '../entities/ticket.entity';
import { JsonApiInterceptor } from 'src/interceptors/json-api.interceptor';

@Controller('tickets')
@UseInterceptors(
  new JsonApiInterceptor('ticket', {
    attributes: [
      'seatNumber',
      'lunggage',
      'created_at',
      'updated_at',
      'routeId',
    ],
    keyForAttribute: 'camelCase',
  }),
)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.findOne(+id);
  }

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(createTicketDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.ticketService.remove(+id);
  }
}
