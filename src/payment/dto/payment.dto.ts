import { IsDecimal, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  ticketId: number;

  @IsDecimal()
  amount: number;

  @IsDate()
  paymentDate: Date;
}

export class UpdatePaymentDto {
  @IsOptional()
  @IsNumber()
  ticketId?: number;

  @IsOptional()
  @IsDecimal()
  amount?: number;

  @IsOptional()
  @IsDate()
  paymentDate?: Date;
}
