export interface IObserver {
  update(agendamentoId: string, novoStatus: string): void;
}

export interface ISubject {
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notifyObservers(agendamentoId: string, novoStatus: string): void;
}

export class NotificationObserver implements IObserver {
  update(agendamentoId: string, novoStatus: string): void {
    console.log(
      `[Notificação Observer] O status do Agendamento '${agendamentoId}' mudou para '${novoStatus}'. Notificando os usuários pelo celular ou email.`,
    );
  }
}
