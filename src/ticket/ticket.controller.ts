import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from '../entities/ticket.entity';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Ticket> {
    return this.ticketService.findOne(id);
  }

  @Post()
  create(@Body() ticket: Ticket): Promise<Ticket> {
    return this.ticketService.create(ticket);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() ticket: Ticket): Promise<Ticket> {
    return this.ticketService.update(id, ticket);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ticketService.remove(id);
  }
}
