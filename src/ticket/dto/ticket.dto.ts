import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  routeId: number;

  @IsString()
  seatNumber: string;

  @IsBoolean()
  luggage: boolean;
}

export class UpdateTicketDto {
  @IsOptional()
  @IsNumber()
  routeId?: number;

  @IsOptional()
  @IsString()
  seatNumber?: string;

  @IsOptional()
  @IsBoolean()
  luggage?: boolean;
}
