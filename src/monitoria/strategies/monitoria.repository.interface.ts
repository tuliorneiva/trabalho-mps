import { Monitoria } from '../entities/monitoria.entity';

export const MONITORIA_REPOSITORY = 'MONITORIA_REPOSITORY';

export interface IMonitoriaRepository {
  findAll(): Promise<Monitoria[]>;
  findById(id: number): Promise<Monitoria | undefined>;
  create(data: Partial<Monitoria>): Promise<Monitoria>;
  update(id: number, data: Partial<Monitoria>): Promise<Monitoria>;
  delete(id: number): Promise<boolean>;
  count(): Promise<number>;
}
