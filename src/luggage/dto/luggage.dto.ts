import { IsDecimal, IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLuggageDto {
  @IsNumber()
  ticketId: number;

  @IsDecimal({ decimal_digits: '2' })
  @IsNotEmpty()
  weight: string; 

  @IsString()
  @IsNotEmpty()
  description?: string;
}

export class UpdateLuggageDto {
  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  weight?: string; 

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  ticketId?: number;
}
