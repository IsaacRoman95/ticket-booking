import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Luggage } from '../entities/luggage.entity';
import { Ticket } from '../entities/ticket.entity';
import { CreateLuggageDto } from './dto/luggage.dto';

@Injectable()
export class LuggageService {
  constructor(
    @InjectRepository(Luggage)
    private readonly luggageRepository: Repository<Luggage>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  findAll(): Promise<Luggage[]> {
    return this.luggageRepository.find({ relations: ['ticket'] });
  }

  findOne(id: number): Promise<Luggage> {
    return this.luggageRepository.findOne({
      where: { id },
      relations: ['ticket'],
    });
  }

  async create(createLuggageDto: CreateLuggageDto): Promise<Luggage> {
    const { weight, description, ticketId } = createLuggageDto;
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const luggage = new Luggage();
    luggage.weight = weight;
    luggage.description = description;
    luggage.ticket = ticket;

    return this.luggageRepository.save(luggage);
  }

  async update(id: number, luggage: Luggage): Promise<Luggage> {
    await this.luggageRepository.update(id, luggage);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.luggageRepository.delete(id);
  }
}
