import { Module } from '@nestjs/common';
import { MonitoriaController } from './monitoria.controller';
import { MonitoriaService } from './monitoria.service';
import { MONITORIA_REPOSITORY } from './strategies/monitoria.repository.interface';
import { RepositoryFactory } from '../common/factories/repository.factory';
import { RepositoriesModule } from '../common/factories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [MonitoriaController],
  providers: [
    MonitoriaService,
    {
      provide: MONITORIA_REPOSITORY,
      useFactory: (factory: RepositoryFactory) =>
        factory.createMonitoriaRepository(),
      inject: [RepositoryFactory],
    },
  ],
  exports: [MonitoriaService],
})
export class MonitoriaModule {}
