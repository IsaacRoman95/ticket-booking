import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Luggage } from '../entities/luggage.entity';
import { LuggageService } from './luggage.service';
import { LuggageController } from './luggage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Luggage])],
  providers: [LuggageService],
  controllers: [LuggageController],
})
export class LuggageModule {}
