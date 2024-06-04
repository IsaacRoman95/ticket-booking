import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  findOne(id: number): Promise<Payment> {
    return this.paymentRepository.findOneBy({ id });
  }

  create(payment: Payment): Promise<Payment> {
    return this.paymentRepository.save(payment);
  }

  async update(id: number, payment: Payment): Promise<Payment> {
    await this.paymentRepository.update(id, payment);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
