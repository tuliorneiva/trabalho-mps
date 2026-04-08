import { Monitoria } from '../entities/monitoria.entity';
import { IMonitoriaRepository } from './monitoria.repository.interface';

export class MonitoriaInMemoryRepository implements IMonitoriaRepository {
  private monitorias: Map<number, Monitoria> = new Map();
  private nextId = 1;

  async findAll(): Promise<Monitoria[]> {
    return Array.from(this.monitorias.values());
  }

  async findById(id: number): Promise<Monitoria | undefined> {
    return this.monitorias.get(id);
  }

  async create(data: Partial<Monitoria>): Promise<Monitoria> {
    const monitoria = Object.assign(new Monitoria(), {
      ...data,
      idMonitoria: this.nextId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.monitorias.set(monitoria.idMonitoria, monitoria);
    return monitoria;
  }

  async update(id: number, data: Partial<Monitoria>): Promise<Monitoria> {
    const existing = this.monitorias.get(id);
    if (!existing) throw new Error('Monitoria não encontrada');
    const updated = Object.assign(existing, data, { updatedAt: new Date() });
    this.monitorias.set(id, updated);
    return updated;
  }

  async delete(id: number): Promise<boolean> {
    return this.monitorias.delete(id);
  }

  async count(): Promise<number> {
    return this.monitorias.size;
  }
}
