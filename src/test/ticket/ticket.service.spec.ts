import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { TicketService } from '../../ticket/ticket.service';
import { Ticket } from '../../entities/ticket.entity';

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
    const newTicket: Ticket = {
      id: 1,
      route: null, // You can adjust the properties as needed
      seatNumber: 'A1',
      luggage: false,
      seats: [],
      luggages: [],
      payments: [],
      created_at: new Date(),
      updated_at: new Date(),
    };
    jest.spyOn(repository, 'save').mockResolvedValue(newTicket);

    const result = await service.create(newTicket);

    expect(result).toEqual(newTicket);
  });

  it('should find a ticket by id', async () => {
    const ticket: Ticket = {
      id: 1,
      route: null, // Adjust properties as needed
      seatNumber: 'A1',
      luggage: false,
      seats: [],
      luggages: [],
      payments: [],
      created_at: new Date(),
      updated_at: new Date(),
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(ticket);

    const result = await service.findOne(1);

    expect(result).toEqual(ticket);
  });

  it('should update a ticket by id', async () => {
    const updatedTicket: Ticket = {
      id: 1,
      route: null,
      seatNumber: 'A2',
      luggage: true,
      seats: [],
      luggages: [],
      payments: [],
      created_at: new Date(),
      updated_at: new Date(),
    };
    jest
      .spyOn(repository, 'update')
      .mockResolvedValue({ raw: {}, affected: 1 } as UpdateResult);
    jest.spyOn(repository, 'findOne').mockResolvedValue(updatedTicket);

    const result = await service.update(1, updatedTicket);

    expect(result).toEqual(updatedTicket);
  });

  it('should remove a ticket by id', async () => {
    jest
      .spyOn(repository, 'delete')
      .mockResolvedValue({ raw: {}, affected: 1 } as DeleteResult);

    await expect(service.remove(1)).resolves.toBeUndefined();
  });
});
