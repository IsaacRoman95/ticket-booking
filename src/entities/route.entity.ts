import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Ticket } from './ticket.entity';
import { IsString, IsDate } from 'class-validator';

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  origin: string;

  @Column()
  @IsString()
  destination: string;

  @Column()
  @IsDate()
  travelDate: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.route)
  tickets: Ticket[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
