import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Monitoria } from '../../monitoria/entities/monitoria.entity';
import { RepositoryFactory } from './repository.factory';
import { InMemoryRepositoryFactory } from './in-memory-repository.factory';
import { TypeOrmRepositoryFactory } from './typeorm-repository.factory';

const useMemory = process.env.STORAGE_TYPE === 'memory';

/**
 * Módulo responsável por registrar a fábrica correta de repositórios.
 * A seleção entre InMemory e TypeORM é feita uma única vez aqui,
 * e os módulos de domínio consomem RepositoryFactory via injeção de dependência.
 */
@Module({
  imports: useMemory ? [] : [TypeOrmModule.forFeature([User, Monitoria])],
  providers: [
    useMemory
      ? { provide: RepositoryFactory, useClass: InMemoryRepositoryFactory }
      : { provide: RepositoryFactory, useClass: TypeOrmRepositoryFactory },
  ],
  exports: [RepositoryFactory],
})
export class RepositoriesModule {}
