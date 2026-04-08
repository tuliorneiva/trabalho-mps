import { Notificacao } from './notificacao';

/**
 * Builder para construir objetos Notificacao passo a passo.
 * Permite criar notificações de push ou email com diferentes combinações
 * de campos sem expor a complexidade da construção ao código cliente.
 * Padrão: Builder (GoF Criacional)
 */
export class NotificacaoBuilder {
  private titulo?: string;
  private corpo?: string;
  private destinatarioId?: string;
  private tipo?: 'push' | 'email';
  private agendamentoId?: string;

  setTitulo(titulo: string): this {
    this.titulo = titulo;
    return this;
  }

  setCorpo(corpo: string): this {
    this.corpo = corpo;
    return this;
  }

  setDestinatario(destinatarioId: string): this {
    this.destinatarioId = destinatarioId;
    return this;
  }

  setTipo(tipo: 'push' | 'email'): this {
    this.tipo = tipo;
    return this;
  }

  setAgendamento(agendamentoId: string): this {
    this.agendamentoId = agendamentoId;
    return this;
  }

  build(): Notificacao {
    if (!this.titulo) throw new Error('Título da notificação é obrigatório.');
    if (!this.destinatarioId) throw new Error('Destinatário da notificação é obrigatório.');
    if (!this.tipo) throw new Error('Tipo da notificação é obrigatório (push ou email).');
    if (!this.corpo) throw new Error('Corpo da notificação é obrigatório.');

    const notificacao = new Notificacao();
    notificacao.titulo = this.titulo;
    notificacao.corpo = this.corpo;
    notificacao.destinatarioId = this.destinatarioId;
    notificacao.tipo = this.tipo;
    notificacao.agendamentoId = this.agendamentoId;
    notificacao.criadaEm = new Date();
    return notificacao;
  }
}
