import { IAgendamentoState } from './states/agendamento-state.interface';
import { SolicitadoState } from './states/solicitado.state';

/**
 * Contexto da máquina de estados do Agendamento.
 * Delega o comportamento das transições ao estado atual.
 * Padrão: State (GoF Comportamental)
 */
export class Agendamento {
  readonly id: number;
  readonly monitoriaId: number;
  readonly alunoId: string;
  private state: IAgendamentoState;

  constructor(id: number, monitoriaId: number, alunoId: string) {
    this.id = id;
    this.monitoriaId = monitoriaId;
    this.alunoId = alunoId;
    this.state = new SolicitadoState();
  }

  setState(state: IAgendamentoState): void {
    this.state = state;
  }

  getStatus(): string {
    return this.state.getNomeEstado();
  }

  confirmar(): void {
    this.state.confirmar(this);
  }

  cancelar(): void {
    this.state.cancelar(this);
  }

  concluir(): void {
    this.state.concluir(this);
  }
}
