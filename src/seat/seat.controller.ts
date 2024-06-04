import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { Seat } from '../entities/seat.entity';

@Controller('seats')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get()
  findAll(): Promise<Seat[]> {
    return this.seatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Seat> {
    return this.seatService.findOne(id);
  }

  @Post()
  create(@Body() seat: Seat): Promise<Seat> {
    return this.seatService.create(seat);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() seat: Seat): Promise<Seat> {
    return this.seatService.update(id, seat);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.seatService.remove(id);
  }
}
