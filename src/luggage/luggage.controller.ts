import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { LuggageService } from './luggage.service';
import { Luggage } from '../entities/luggage.entity';

@Controller('luggages')
export class LuggageController {
  constructor(private readonly luggageService: LuggageService) {}

  @Get()
  findAll(): Promise<Luggage[]> {
    return this.luggageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Luggage> {
    return this.luggageService.findOne(id);
  }

  @Post()
  create(@Body() luggage: Luggage): Promise<Luggage> {
    return this.luggageService.create(luggage);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() luggage: Luggage): Promise<Luggage> {
    return this.luggageService.update(id, luggage);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.luggageService.remove(id);
  }
}
