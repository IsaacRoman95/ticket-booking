import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LuggageService } from './luggage.service';
import { CreateLuggageDto, UpdateLuggageDto } from './dto/luggage.dto';
import { JsonApiInterceptor } from 'src/interceptors/json-api.interceptor';

@Controller('luggages')
@UseInterceptors(
  new JsonApiInterceptor('luggage', {
    attributes: ['weight', 'description', 'created_at', 'updated_at', 'ticket'],
    keyForAttribute: 'camelCase',
    ticket: {
      ref: 'id',
      attributes: [
        'origin',
        'destination',
        'travelDate',
        'created_at',
        'updated_at',
      ],
    },
  }),
)
export class LuggageController {
  constructor(private readonly luggageService: LuggageService) {}

  @Get()
  async findAll() {
    return this.luggageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.luggageService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLuggageDto: CreateLuggageDto) {
    return this.luggageService.create(createLuggageDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLuggageDto: UpdateLuggageDto,
  ) {
    return this.luggageService.update(+id, updateLuggageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.luggageService.remove(+id);
  }
}
