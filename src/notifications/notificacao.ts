/**
 * Produto do Builder — representa uma notificação completa e válida.
 * Padrão: Builder (GoF Criacional)
 */
export class Notificacao {
  titulo: string;
  corpo: string;
  destinatarioId: string;
  tipo: 'push' | 'email';
  agendamentoId?: string;
  criadaEm: Date;

  toString(): string {
    return (
      `[${this.tipo.toUpperCase()}] ${this.titulo} → ${this.destinatarioId}: ${this.corpo}` +
      (this.agendamentoId ? ` (Agendamento: ${this.agendamentoId})` : '')
    );
  }
}
