import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitoria } from './entities/monitoria.entity';
import { MonitoriaController } from './monitoria.controller';
import { MonitoriaService } from './monitoria.service';
import { MonitoriaTypeOrmRepository } from './strategies/monitoria-typeorm.strategy';
import { MONITORIA_REPOSITORY } from './strategies/monitoria.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Monitoria])],
  controllers: [MonitoriaController],
  providers: [
    MonitoriaService,
    { provide: MONITORIA_REPOSITORY, useClass: MonitoriaTypeOrmRepository },
  ],
  exports: [MonitoriaService],
})
export class MonitoriaModule {}
