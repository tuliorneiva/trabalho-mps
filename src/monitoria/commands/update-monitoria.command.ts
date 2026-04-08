import { ICommand } from './command.interface';
import { Monitoria } from '../entities/monitoria.entity';
import { IMonitoriaRepository } from '../strategies/monitoria.repository.interface';
import { ILogger } from '../../common/log.adapter';
import { MonitoriaMemento } from '../monitoria.memento';

/**
 * Encapsula a operação de atualização de Monitoria como um objeto Command.
 * Captura o estado atual em um Memento antes de executar a atualização.
 * Padrões: Command + Memento (GoF Comportamental)
 */
export class UpdateMonitoriaCommand
  implements ICommand<{ monitoria: Monitoria; memento: MonitoriaMemento }>
{
  constructor(
    private readonly repo: IMonitoriaRepository,
    private readonly id: number,
    private readonly data: Partial<Monitoria>,
    private readonly currentState: Monitoria,
    private readonly logger: ILogger,
  ) {}

  async execute(): Promise<{ monitoria: Monitoria; memento: MonitoriaMemento }> {
    const memento = new MonitoriaMemento(this.currentState);
    this.logger.log(
      `[UpdateMonitoriaCommand] Atualizando monitoria ${this.id}. Memento salvo.`,
      'Command',
    );
    const monitoria = await this.repo.update(this.id, this.data);
    return { monitoria, memento };
  }
}
