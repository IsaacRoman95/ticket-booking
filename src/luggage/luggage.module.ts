import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Luggage } from '../entities/luggage.entity';
import { Ticket } from '../entities/ticket.entity';
import { LuggageService } from './luggage.service';
import { LuggageController } from './luggage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Luggage, Ticket])],
  controllers: [LuggageController],
  providers: [LuggageService],
})
export class LuggageModule {}
