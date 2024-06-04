import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Luggage } from '../entities/luggage.entity';

@Injectable()
export class LuggageService {
  constructor(
    @InjectRepository(Luggage)
    private luggageRepository: Repository<Luggage>,
  ) {}

  findAll(): Promise<Luggage[]> {
    return this.luggageRepository.find();
  }

  findOne(id: number): Promise<Luggage> {
    return this.luggageRepository.findOneBy({ id });
  }

  create(luggage: Luggage): Promise<Luggage> {
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
