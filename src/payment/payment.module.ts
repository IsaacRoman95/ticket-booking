import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Ticket } from 'src/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Ticket])],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
