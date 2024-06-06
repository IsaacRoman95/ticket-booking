// src/route/route.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../entities/route.entity';
import { CreateRouteDto, UpdateRouteDto } from './dto/route.dto';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
  ) {}

  findAll(query: any): Promise<Route[]> {
    const { origin, destination, travelDate } = query;
    return this.routeRepository.find({
      where: { origin, destination, travelDate },
    });
  }

  findOne(id: number): Promise<Route> {
    return this.routeRepository.findOne({ where: { id } });
  }

  create(createRouteDto: CreateRouteDto): Promise<Route> {
    const newRoute = this.routeRepository.create(createRouteDto);
    return this.routeRepository.save(newRoute);
  }

  async update(id: number, updateRouteDto: UpdateRouteDto): Promise<Route> {
    const routeToUpdate = await this.findOne(id);
    if (!routeToUpdate) {
      throw new Error(`Route with id ${id} not found`);
    }

    if (updateRouteDto.origin !== undefined) {
      routeToUpdate.origin = updateRouteDto.origin;
    }
    if (updateRouteDto.destination !== undefined) {
      routeToUpdate.destination = updateRouteDto.destination;
    }
    if (updateRouteDto.travelDate !== undefined) {
      routeToUpdate.travelDate = new Date(updateRouteDto.travelDate);
    }

    await this.routeRepository.save(routeToUpdate);
    return routeToUpdate;
  }

  async remove(id: number): Promise<void> {
    await this.routeRepository.delete(id);
  }
}
