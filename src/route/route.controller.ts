import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { Route } from '../entities/route.entity';
import { JsonApiInterceptor } from 'src/interceptors/json-api.interceptor';

@Controller('route')
@UseInterceptors(
  new JsonApiInterceptor('route', {
    attributes: [
      'origin',
      'destination',
      'travelDate',
      'created_at',
      'updated_at',
    ],
    keyForAttribute: 'camelCase',
  }),
)
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.routeService.findAll(query); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(+id);
  }

  @Post()
  create(@Body() createRouteDto: Route) {
    return this.routeService.create(createRouteDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: Route) {
    return this.routeService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  async deleteRoute(@Param('id') id: string): Promise<any> {
    const deletedRoute = await this.routeService.remove(parseInt(id, 10));

    return { message: 'Route deleted successfully', data: deletedRoute };
  }
}
