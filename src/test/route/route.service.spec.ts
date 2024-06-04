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
      // Creamos un objeto Route para usar en las pruebas
      const route: Route = new Route();
      route.id = 1;
      route.origin = 'Origin';
      route.destination = 'Destination';
      route.travelDate = new Date();

      // Mockeamos el método 'find' del repositorio para devolver nuestro objeto Route
      jest.spyOn(repository, 'find').mockResolvedValue([route]);

      // Ejecutamos el método 'findAll' y esperamos que devuelva un array con nuestro objeto Route
      const result = await service.findAll();

      expect(result).toEqual([route]);
    });
  });

  describe('findOne', () => {
    it('should return a route by id', async () => {
      // Creamos un objeto Route para usar en las pruebas
      const route: Route = new Route();
      route.id = 1;
      route.origin = 'Origin';
      route.destination = 'Destination';
      route.travelDate = new Date();

      // Mockeamos el método 'findOne' del repositorio para devolver nuestro objeto Route
      jest.spyOn(repository, 'findOne').mockResolvedValue(route);

      // Ejecutamos el método 'findOne' y esperamos que devuelva nuestro objeto Route
      const result = await service.findOne(1);

      expect(result).toEqual(route);
    });
  });

  describe('create', () => {
    it('should create a new route', async () => {
      // Creamos un nuevo objeto Route sin asignarle un id
      const newRoute: Route = new Route();
      newRoute.origin = 'Origin';
      newRoute.destination = 'Destination';
      newRoute.travelDate = new Date();

      // Mockeamos el método 'save' del repositorio para devolver nuestro nuevo objeto Route
      jest.spyOn(repository, 'save').mockResolvedValue(newRoute);

      // Ejecutamos el método 'create' y esperamos que devuelva nuestro nuevo objeto Route
      const result = await service.create(newRoute);

      expect(result).toEqual(newRoute);
    });
  });

  describe('update', () => {
    it('should update a route by id', async () => {
      // Creamos un objeto Route para usar en las pruebas
      const route: Route = new Route();
      route.id = 1;
      route.origin = 'Origin';
      route.destination = 'Destination';
      route.travelDate = new Date();

      // Mockeamos el método 'update' del repositorio para devolver una promesa de undefined (lo que simula que el update se realizó correctamente)
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);

      // Mockeamos el método 'findOne' del repositorio para devolver el objeto Route actualizado
      jest.spyOn(repository, 'findOne').mockResolvedValue(route);

      // Ejecutamos el método 'update' y esperamos que devuelva nuestro objeto Route actualizado
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
