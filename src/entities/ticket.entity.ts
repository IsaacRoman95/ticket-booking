import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  OneToMany, 
  CreateDateColumn, 
  UpdateDateColumn, 
  Index 
} from 'typeorm';
import { Route } from './route.entity';
import { Seat } from './seat.entity';
import { Luggage } from './luggage.entity';
import { Payment } from './payment.entity';
import { IsString, IsBoolean } from 'class-validator';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Route, (route) => route.tickets)
  @Index()
  route: Route;

  @Column()
  @IsString()
  seatNumber: string;

  @Column({ default: false })
  @IsBoolean()
  luggage: boolean;

  @OneToMany(() => Seat, (seat) => seat.ticket)
  seats: Seat[];

  @OneToMany(() => Luggage, (luggage) => luggage.ticket)
  luggages: Luggage[];

  @OneToMany(() => Payment, (payment) => payment.ticket)
  payments: Payment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
