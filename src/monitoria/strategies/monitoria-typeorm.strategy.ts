import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Monitoria } from '../entities/monitoria.entity';
import { IMonitoriaRepository } from './monitoria.repository.interface';

@Injectable()
export class MonitoriaTypeOrmRepository implements IMonitoriaRepository {
  constructor(
    @InjectRepository(Monitoria)
    readonly repo: Repository<Monitoria>,
  ) {}

  async findAll(): Promise<Monitoria[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Monitoria | undefined> {
    return (await this.repo.findOne({ where: { idMonitoria: id } })) ?? undefined;
  }

  async create(data: Partial<Monitoria>): Promise<Monitoria> {
    const monitoria = this.repo.create(data);
    return this.repo.save(monitoria);
  }

  async update(id: number, data: Partial<Monitoria>): Promise<Monitoria> {
    const monitoria = await this.repo.findOne({ where: { idMonitoria: id } });
    if (!monitoria) throw new Error('Monitoria não encontrada');
    Object.assign(monitoria, data);
    return this.repo.save(monitoria);
  }

  async delete(id: number): Promise<boolean> {
    const monitoria = await this.repo.findOne({ where: { idMonitoria: id } });
    if (!monitoria) return false;
    await this.repo.remove(monitoria);
    return true;
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
