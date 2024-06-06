import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSeatDto {
  @IsString()
  seatNumber: string;

  @IsNumber()
  ticketId: number;
}

export class UpdateSeatDto {
  @IsOptional()
  @IsString()
  seatNumber?: string;

  @IsOptional()
  @IsNumber()
  ticketId?: number;
}
