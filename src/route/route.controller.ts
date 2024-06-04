import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { Route } from '../entities/route.entity';

@Controller('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  findAll(): Promise<Route[]> {
    return this.routeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Route> {
    return this.routeService.findOne(id);
  }

  @Post()
  create(@Body() route: Route): Promise<Route> {
    return this.routeService.create(route);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() route: Route): Promise<Route> {
    return this.routeService.update(id, route);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.routeService.remove(id);
  }
}
