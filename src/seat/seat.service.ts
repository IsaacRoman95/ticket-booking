// src/seat/seat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from '../entities/seat.entity';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  findAll(): Promise<Seat[]> {
    return this.seatRepository.find();
  }

  findOne(id: number): Promise<Seat> {
    return this.seatRepository.findOneBy({ id });
  }

  create(seat: Seat): Promise<Seat> {
    return this.seatRepository.save(seat);
  }

  async update(id: number, seat: Seat): Promise<Seat> {
    await this.seatRepository.update(id, seat);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.seatRepository.delete(id);
  }
}
