import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryFactory } from './repository.factory';
import { IUsersRepository } from '../../users/strategies/users.repository.interface';
import { IMonitoriaRepository } from '../../monitoria/strategies/monitoria.repository.interface';
import { UsersTypeOrmRepository } from '../../users/strategies/users-typeorm.strategy.ts';
import { MonitoriaTypeOrmRepository } from '../../monitoria/strategies/monitoria-typeorm.strategy';
import { User } from '../../users/entities/user.entity';
import { Monitoria } from '../../monitoria/entities/monitoria.entity';

/**
 * Fábrica concreta que produz repositórios TypeORM (PostgreSQL).
 * Usada em produção quando STORAGE_TYPE != memory.
 * Padrão: Abstract Factory — implementação TypeORM
 */
@Injectable()
export class TypeOrmRepositoryFactory extends RepositoryFactory {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Monitoria)
    private readonly monitoriaRepo: Repository<Monitoria>,
  ) {
    super();
  }

  createUsersRepository(): IUsersRepository {
    return new UsersTypeOrmRepository(this.userRepo);
  }

  createMonitoriaRepository(): IMonitoriaRepository {
    return new MonitoriaTypeOrmRepository(this.monitoriaRepo);
  }
}
