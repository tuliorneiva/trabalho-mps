import { Test, TestingModule } from '@nestjs/testing';
import { FacadeSingletonController } from './facade-singleton.controller';
import { UsersService } from '../users/users.service';
import { MonitoriaService } from '../monitoria/monitoria.service';
import { User } from '../users/entities/user.entity';
import { Monitoria } from '../monitoria/entities/monitoria.entity';

describe('FacadeSingletonController (Facade + Singleton)', () => {
  let controller: FacadeSingletonController;
  let usersService: jest.Mocked<UsersService>;
  let monitoriaService: jest.Mocked<MonitoriaService>;

  beforeEach(async () => {
    (FacadeSingletonController as any).instance = null;

    const mockUsersService = {
      getAllUsers: jest.fn(),
      findOneUser: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      simularMudancaDeStatusDoAgendamento: jest.fn(),
      addObserver: jest.fn(),
      removeObserver: jest.fn(),
      notifyObservers: jest.fn(),
    };

    const mockMonitoriaService = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      undo: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacadeSingletonController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: MonitoriaService, useValue: mockMonitoriaService },
      ],
    }).compile();

    controller = module.get<FacadeSingletonController>(FacadeSingletonController);
    usersService = module.get(UsersService);
    monitoriaService = module.get(MonitoriaService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('getSystemStatistics deve retornar totalUsers e totalMonitorias', async () => {
    usersService.getAllUsers.mockResolvedValue([new User(), new User()] as User[]);
    monitoriaService.count.mockResolvedValue(3);

    const stats = await controller.getSystemStatistics();

    expect(stats).toEqual({ totalUsers: 2, totalMonitorias: 3 });
  });

  it('getAllUsers deve delegar ao UsersService', async () => {
    usersService.getAllUsers.mockResolvedValue([new User()]);
    const result = await controller.getAllUsers();
    expect(result).toHaveLength(1);
  });

  it('getAllMonitorias deve delegar ao MonitoriaService', async () => {
    monitoriaService.findAll.mockResolvedValue([new Monitoria()]);
    const result = await controller.getAllMonitorias();
    expect(result).toHaveLength(1);
  });
});
