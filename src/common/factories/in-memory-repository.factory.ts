import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from './repository.factory';
import { IUsersRepository } from '../../users/strategies/users.repository.interface';
import { IMonitoriaRepository } from '../../monitoria/strategies/monitoria.repository.interface';
import { UsersInMemoryRepository } from '../../users/strategies/users-in-memory.strategy';
import { MonitoriaInMemoryRepository } from '../../monitoria/strategies/monitoria-in-memory.strategy';

/**
 * Fábrica concreta que produz repositórios em memória.
 * Usada quando STORAGE_TYPE=memory (desenvolvimento e testes).
 * Padrão: Abstract Factory — implementação InMemory
 */
@Injectable()
export class InMemoryRepositoryFactory extends RepositoryFactory {
  createUsersRepository(): IUsersRepository {
    return new UsersInMemoryRepository();
  }

  createMonitoriaRepository(): IMonitoriaRepository {
    return new MonitoriaInMemoryRepository();
  }
}
