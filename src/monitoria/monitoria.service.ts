import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Monitoria } from './entities/monitoria.entity';
import { CreateMonitoriaDTO } from './dto/create-monitoria.dto';
import { UpdateMonitoriaDTO } from './dto/update-monitoria.dto';
import {
  IMonitoriaRepository,
  MONITORIA_REPOSITORY,
} from './strategies/monitoria.repository.interface';
import { NestLoggerAdapter, ILogger } from '../common/log.adapter';
import { CreateMonitoriaCommand } from './commands/create-monitoria.command';
import { UpdateMonitoriaCommand } from './commands/update-monitoria.command';
import { MonitoriaMemento } from './monitoria.memento';

@Injectable()
export class MonitoriaService {
  private readonly logger: ILogger;
  private readonly mementos = new Map<number, MonitoriaMemento>();

  constructor(
    @Inject(MONITORIA_REPOSITORY)
    private readonly monitoriaRepository: IMonitoriaRepository,
  ) {
    this.logger = new NestLoggerAdapter('MonitoriaService');
  }

  async findAll(): Promise<Monitoria[]> {
    return this.monitoriaRepository.findAll();
  }

  async findById(id: number): Promise<Monitoria> {
    const monitoria = await this.monitoriaRepository.findById(id);
    if (!monitoria) {
      throw new HttpException('Monitoria não encontrada', HttpStatus.NOT_FOUND);
    }
    return monitoria;
  }

  async create(dto: CreateMonitoriaDTO): Promise<Monitoria> {
    const command = new CreateMonitoriaCommand(
      this.monitoriaRepository,
      dto,
      this.logger,
    );
    return command.execute();
  }

  async update(id: number, dto: UpdateMonitoriaDTO): Promise<Monitoria> {
    const current = await this.findById(id);
    const command = new UpdateMonitoriaCommand(
      this.monitoriaRepository,
      id,
      dto,
      current,
      this.logger,
    );
    const { monitoria, memento } = await command.execute();
    this.mementos.set(id, memento);
    return monitoria;
  }

  async undo(id: number): Promise<Monitoria> {
    const memento = this.mementos.get(id);
    if (!memento) {
      throw new HttpException(
        'Nenhum estado anterior encontrado para esta monitoria',
        HttpStatus.NOT_FOUND,
      );
    }
    const restoredData = memento.getState();
    this.logger.log(
      `[Memento] Restaurando estado anterior da monitoria ${id}`,
      'Memento',
    );
    const restored = await this.monitoriaRepository.update(id, restoredData);
    this.mementos.delete(id);
    return restored;
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.findById(id);
    await this.monitoriaRepository.delete(id);
    return { message: 'Monitoria deletada com sucesso' };
  }

  async count(): Promise<number> {
    return this.monitoriaRepository.count();
  }
}
