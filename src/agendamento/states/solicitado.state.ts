import { IAgendamentoState } from './agendamento-state.interface';
import { Agendamento } from '../agendamento';
import { ConfirmadoState } from './confirmado.state';
import { CanceladoState } from './cancelado.state';

export class SolicitadoState implements IAgendamentoState {
  getNomeEstado(): string {
    return 'Solicitado';
  }

  confirmar(agendamento: Agendamento): void {
    agendamento.setState(new ConfirmadoState());
  }

  cancelar(agendamento: Agendamento): void {
    agendamento.setState(new CanceladoState());
  }

  concluir(_agendamento: Agendamento): void {
    throw new Error('Não é possível concluir um agendamento ainda não confirmado.');
  }
}
