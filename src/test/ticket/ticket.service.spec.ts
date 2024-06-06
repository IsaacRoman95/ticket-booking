import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketService } from '../../ticket/ticket.service';
import { Ticket } from '../../entities/ticket.entity';
import { CreateTicketDto } from '../../ticket/dto/ticket.dto';

describe('TicketService', () => {
  let service: TicketService;
  let repository: Repository<Ticket>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: getRepositoryToken(Ticket),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
    repository = module.get<Repository<Ticket>>(getRepositoryToken(Ticket));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new ticket', async () => {
    const newTicketDto: CreateTicketDto = {
      routeId: 1,
      seatNumber: 'A1',
      luggage: false,
    };

    const newTicket: Ticket = {
      id: 1, // Ajusta el ID según tu lógica
      route: null, // Ajusta las propiedades según tu lógica
      seats: [],
      luggages: [],
      payments: [],
      created_at: new Date(),
      updated_at: new Date(),
      ...newTicketDto, // Incluye las propiedades del DTO
    };

    jest.spyOn(repository, 'create').mockReturnValue(newTicket);
    jest.spyOn(repository, 'save').mockResolvedValue(newTicket);

    const result = await service.create(newTicketDto);

    expect(result).toEqual(newTicket);
  });
});
