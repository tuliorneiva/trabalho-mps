import { IAgendamentoState } from './agendamento-state.interface';
import { Agendamento } from '../agendamento';
import { CanceladoState } from './cancelado.state';
import { ConcluidoState } from './concluido.state';

export class ConfirmadoState implements IAgendamentoState {
  getNomeEstado(): string {
    return 'Confirmado';
  }

  confirmar(_agendamento: Agendamento): void {
    throw new Error('Agendamento já está confirmado.');
  }

  cancelar(agendamento: Agendamento): void {
    agendamento.setState(new CanceladoState());
  }

  concluir(agendamento: Agendamento): void {
    agendamento.setState(new ConcluidoState());
  }
}
