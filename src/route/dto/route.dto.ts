import { Type } from 'class-transformer';
import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsDate()
  @Type(() => Date)
  travelDate: Date;
}

export class UpdateRouteDto {
  @IsOptional()
  @IsString()
  origin?: string;

  @IsOptional()
  @IsString()
  destination?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  travelDate?: Date;
}
