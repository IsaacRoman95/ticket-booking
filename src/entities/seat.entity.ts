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
import { IsString } from 'class-validator';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  seatNumber: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.seats)
  @Index()
  ticket: Ticket;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
