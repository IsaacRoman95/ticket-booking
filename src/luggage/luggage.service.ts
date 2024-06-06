import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Luggage } from '../entities/luggage.entity';
import { Ticket } from '../entities/ticket.entity';
import { CreateLuggageDto, UpdateLuggageDto } from './dto/luggage.dto';

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

  async findOne(id: number): Promise<Luggage> {
    const luggage = await this.luggageRepository.findOne({
      where: { id },
      relations: ['ticket'],
    });
    if (!luggage) {
      throw new NotFoundException('Luggage not found');
    }
    return luggage;
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
    luggage.weight = parseFloat(weight);
    luggage.description = description;
    luggage.ticket = ticket;

    return this.luggageRepository.save(luggage);
  }

  async update(
    id: number,
    updateLuggageDto: UpdateLuggageDto,
  ): Promise<Luggage> {
    const luggageToUpdate = await this.luggageRepository.findOne({
      where: { id },
    });
    if (!luggageToUpdate) {
      throw new NotFoundException('Luggage not found');
    }

    const { weight, description, ticketId } = updateLuggageDto;
    if (ticketId) {
      const ticket = await this.ticketRepository.findOne({
        where: { id: ticketId },
      });
      if (!ticket) {
        throw new NotFoundException('Ticket not found');
      }
      luggageToUpdate.ticket = ticket;
    }

    if (weight !== undefined) {
      luggageToUpdate.weight = parseFloat(weight);
    }

    if (description !== undefined) {
      luggageToUpdate.description = description;
    }

    return this.luggageRepository.save(luggageToUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.luggageRepository.delete(id);
  }
}
