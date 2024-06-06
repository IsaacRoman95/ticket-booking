import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsDate()
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
  travelDate?: Date;
}
