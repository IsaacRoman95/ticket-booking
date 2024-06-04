import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Ticket } from './entities/ticket.entity';
import { Seat } from './entities/seat.entity';
import { Luggage } from './entities/luggage.entity';
import { Payment } from './entities/payment.entity';
import { RouteModule } from './route/route.module';
import { TicketModule } from './ticket/ticket.module';
import { SeatModule } from './seat/seat.module';
import { LuggageModule } from './luggage/luggage.module';
import { PaymentModule } from './payment/payment.module';
import { jsonApiProvider } from './providers/json-api-provider';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'dbbooking',
      entities: [Route, Ticket, Seat, Luggage, Payment],
      synchronize: true,
    }),
    RouteModule,
    TicketModule,
    SeatModule,
    LuggageModule,
    PaymentModule,
  ],
  providers: [jsonApiProvider],
})
export class AppModule {}
