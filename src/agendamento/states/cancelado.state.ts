import { IAgendamentoState } from './agendamento-state.interface';
import { Agendamento } from '../agendamento';

export class CanceladoState implements IAgendamentoState {
  getNomeEstado(): string {
    return 'Cancelado';
  }

  confirmar(_agendamento: Agendamento): void {
    throw new Error('Agendamento cancelado não pode ser confirmado.');
  }

  cancelar(_agendamento: Agendamento): void {
    throw new Error('Agendamento já está cancelado.');
  }

  concluir(_agendamento: Agendamento): void {
    throw new Error('Agendamento cancelado não pode ser concluído.');
  }
}
