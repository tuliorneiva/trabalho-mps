import { Agendamento } from '../agendamento';

/**
 * Interface de estado do Agendamento.
 * Cada estado concreto define quais transições são permitidas.
 * Padrão: State (GoF Comportamental)
 */
export interface IAgendamentoState {
  confirmar(agendamento: Agendamento): void;
  cancelar(agendamento: Agendamento): void;
  concluir(agendamento: Agendamento): void;
  getNomeEstado(): string;
}
