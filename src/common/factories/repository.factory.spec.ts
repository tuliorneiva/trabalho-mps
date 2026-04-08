import { InMemoryRepositoryFactory } from './in-memory-repository.factory';
import { UsersInMemoryRepository } from '../../users/strategies/users-in-memory.strategy';
import { MonitoriaInMemoryRepository } from '../../monitoria/strategies/monitoria-in-memory.strategy';

describe('RepositoryFactory (Abstract Factory + Factory Method)', () => {
  let factory: InMemoryRepositoryFactory;

  beforeEach(() => {
    factory = new InMemoryRepositoryFactory();
  });

  it('createUsersRepository deve retornar uma instância de IUsersRepository', () => {
    const repo = factory.createUsersRepository();
    expect(repo).toBeInstanceOf(UsersInMemoryRepository);
  });

  it('createMonitoriaRepository deve retornar uma instância de IMonitoriaRepository', () => {
    const repo = factory.createMonitoriaRepository();
    expect(repo).toBeInstanceOf(MonitoriaInMemoryRepository);
  });

  it('cada chamada deve retornar uma nova instância independente', () => {
    const repo1 = factory.createUsersRepository();
    const repo2 = factory.createUsersRepository();
    expect(repo1).not.toBe(repo2);
  });

  it('repositório de monitoria criado deve implementar os métodos da interface', () => {
    const repo = factory.createMonitoriaRepository();
    expect(typeof repo.findAll).toBe('function');
    expect(typeof repo.findById).toBe('function');
    expect(typeof repo.create).toBe('function');
    expect(typeof repo.update).toBe('function');
    expect(typeof repo.delete).toBe('function');
    expect(typeof repo.count).toBe('function');
  });

  it('repositório de users criado deve implementar os métodos da interface', () => {
    const repo = factory.createUsersRepository();
    expect(typeof repo.findAll).toBe('function');
    expect(typeof repo.findById).toBe('function');
    expect(typeof repo.findByEmail).toBe('function');
    expect(typeof repo.create).toBe('function');
    expect(typeof repo.update).toBe('function');
    expect(typeof repo.delete).toBe('function');
  });
});
