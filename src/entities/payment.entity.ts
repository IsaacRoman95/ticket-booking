import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Ticket } from './ticket.entity';
import { IsDecimal, IsDate } from 'class-validator';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.payments)
  @Index()
  ticket: Ticket;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsDecimal({ decimal_digits: '2' })
  amount: number;

  @Column()
  @IsDate()
  paymentDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
