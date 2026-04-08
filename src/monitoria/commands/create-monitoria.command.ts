import { ICommand } from './command.interface';
import { Monitoria } from '../entities/monitoria.entity';
import { IMonitoriaRepository } from '../strategies/monitoria.repository.interface';
import { ILogger } from '../../common/log.adapter';

/**
 * Encapsula a operação de criação de Monitoria como um objeto Command.
 * Padrão: Command (GoF Comportamental)
 */
export class CreateMonitoriaCommand implements ICommand<Monitoria> {
  constructor(
    private readonly repo: IMonitoriaRepository,
    private readonly data: Partial<Monitoria>,
    private readonly logger: ILogger,
  ) {}

  async execute(): Promise<Monitoria> {
    this.logger.log(
      `[CreateMonitoriaCommand] Executando criação de monitoria: "${this.data.titulo}"`,
      'Command',
    );
    return this.repo.create(this.data);
  }
}
