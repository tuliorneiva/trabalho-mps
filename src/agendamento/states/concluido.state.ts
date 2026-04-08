import { IAgendamentoState } from './agendamento-state.interface';
import { Agendamento } from '../agendamento';

export class ConcluidoState implements IAgendamentoState {
  getNomeEstado(): string {
    return 'Concluido';
  }

  confirmar(_agendamento: Agendamento): void {
    throw new Error('Agendamento concluído não pode ser alterado.');
  }

  cancelar(_agendamento: Agendamento): void {
    throw new Error('Agendamento concluído não pode ser cancelado.');
  }

  concluir(_agendamento: Agendamento): void {
    throw new Error('Agendamento já está concluído.');
  }
}
