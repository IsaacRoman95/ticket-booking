// src/ticket/ticket.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { CreateTicketDto } from './dto/ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  findOne(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({ where: { id } });
  }

  create(ticket: Ticket): Promise<Ticket> {
    return this.ticketRepository.save(ticket);
  }

  async createTickets(ticketDto: CreateTicketDto): Promise<Ticket[]> {
    const { routeId, seatNumbers, totalAmount, paymentDate, luggageIds } =
      ticketDto;

    const tickets: Ticket[] = [];

    for (const seatNumber of seatNumbers) {
      const ticket = new Ticket();
      ticket. = routeId;
      ticket.seatNumber = seatNumber;
      ticket. = totalAmount;
      ticket.paymentDate = paymentDate;
      ticket.luggageIds = luggageIds;

      const savedTicket = await this.ticketRepository.save(ticket);
      tickets.push(savedTicket);
    }

    return tickets;
  }

  async update(id: number, ticket: Ticket): Promise<Ticket> {
    await this.ticketRepository.update(id, ticket);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}
