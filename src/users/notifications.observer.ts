import { NotificacaoBuilder } from '../notifications/notificacao.builder';

export interface IObserver {
  update(agendamentoId: string, novoStatus: string): void;
}

export interface ISubject {
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notifyObservers(agendamentoId: string, novoStatus: string): void;
}

/**
 * Observer concreto que usa o NotificacaoBuilder para construir
 * notificações ricas antes de enviá-las.
 * Padrões: Observer (GoF) + Builder (GoF)
 */
export class NotificationObserver implements IObserver {
  update(agendamentoId: string, novoStatus: string): void {
    const notificacao = new NotificacaoBuilder()
      .setTitulo('Status do Agendamento Atualizado')
      .setCorpo(`O agendamento ${agendamentoId} mudou para: ${novoStatus}`)
      .setDestinatario('sistema')
      .setTipo('push')
      .setAgendamento(agendamentoId)
      .build();

    console.log(`[Observer + Builder] Notificação criada: ${notificacao.toString()}`);
  }
}
