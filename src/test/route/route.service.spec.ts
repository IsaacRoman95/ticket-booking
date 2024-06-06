import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteService } from '../../route/route.service';
import { Route } from '../../entities/route.entity';

describe('RouteService', () => {
  let service: RouteService;
  let repository: Repository<Route>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RouteService,
        {
          provide: getRepositoryToken(Route),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RouteService>(RouteService);
    repository = module.get<Repository<Route>>(getRepositoryToken(Route));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of routes', async () => {
      const query = {
        origin: 'Origin',
        destination: 'Destination',
        travelDate: new Date(),
      };

      jest.spyOn(repository, 'find').mockResolvedValue([]);
      const result = await service.findAll(query);
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a route by id', async () => {
      const route: Route = new Route();
      route.id = 1;
      route.origin = 'Origin';
      route.destination = 'Destination';
      route.travelDate = new Date();

      jest.spyOn(repository, 'findOne').mockResolvedValue(route);

      const result = await service.findOne(1);

      expect(result).toEqual(route);
    });
  });

  describe('create', () => {
    it('should create a new route', async () => {
      const newRoute: Route = new Route();
      newRoute.origin = 'Origin';
      newRoute.destination = 'Destination';
      newRoute.travelDate = new Date();

      jest.spyOn(repository, 'save').mockResolvedValue(newRoute);
      const result = await service.create(newRoute);
      expect(result).toEqual(newRoute);
    });
  });

  describe('update', () => {
    it('should update a route by id', async () => {
      const route: Route = new Route();
      route.id = 1;
      route.origin = 'Origin';
      route.destination = 'Destination';
      route.travelDate = new Date();

      jest.spyOn(repository, 'update').mockResolvedValue(undefined);
      jest.spyOn(repository, 'findOne').mockResolvedValue(route);
      const result = await service.update(1, route);
      expect(result).toEqual(route);
    });
  });

  describe('remove', () => {
    it('should remove a route by id', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await expect(service.remove(1)).resolves.toBeUndefined();
    });
  });
});
