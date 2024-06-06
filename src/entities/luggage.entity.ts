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
import { IsDecimal, IsOptional, IsString } from 'class-validator';

@Entity()
export class Luggage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.luggages, { eager: true })
  ticket: Ticket;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  @IsDecimal({ decimal_digits: '2' })
  weight: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
