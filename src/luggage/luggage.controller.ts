import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { LuggageService } from './luggage.service';
import { CreateLuggageDto } from './dto/luggage.dto';
import { Luggage } from '../entities/luggage.entity';
import { JsonApiInterceptor } from 'src/interceptors/json-api.interceptor';

@Controller('luggages')
@UseInterceptors(
  new JsonApiInterceptor('luggage', {
    attributes: ['weight', 'description', 'createdAt', 'updatedAt', 'ticket'],
    keyForAttribute: 'camelCase',
    ticket: {
      ref: 'id',
      attributes: [
        'origin',
        'destination',
        'travelDate',
        'createdAt',
        'updatedAt',
      ],
    },
  }),
)
export class LuggageController {
  constructor(private readonly luggageService: LuggageService) {}

  @Get()
  findAll() {
    return this.luggageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.luggageService.findOne(+id);
  }

  @Post()
  create(@Body() createLuggageDto: CreateLuggageDto) {
    return this.luggageService.create(createLuggageDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLuggageDto: Luggage) {
    return this.luggageService.update(+id, updateLuggageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.luggageService.remove(+id);
  }
}
