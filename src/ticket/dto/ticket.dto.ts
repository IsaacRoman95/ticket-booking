export class CreateTicketDto {
  routeId: number;
  seatNumbers: string[];
  totalAmount: number;
  paymentDate: Date;
  luggageIds: number[];
}
