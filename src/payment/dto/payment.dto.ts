import { Type } from 'class-transformer';
import { IsDecimal, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  ticketId: number;

  @IsDecimal({ decimal_digits: '2' })
  amount: number;

  @IsDate()
  @Type(() => Date)
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
