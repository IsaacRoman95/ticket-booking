// src/route/route.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../entities/route.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
  ) {}

  findAll(): Promise<Route[]> {
    return this.routeRepository.find();
  }

  findOne(id: number): Promise<Route> {
    return this.routeRepository.findOne({ where: { id } });
  }

  create(route: Route): Promise<Route> {
    return this.routeRepository.save(route);
  }

  async update(id: number, route: Route): Promise<Route> {
    await this.routeRepository.update(id, route);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.routeRepository.delete(id);
  }
}
