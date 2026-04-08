import { NotificacaoBuilder } from './notificacao.builder';
import { Notificacao } from './notificacao';

describe('NotificacaoBuilder (Builder Pattern)', () => {
  it('deve construir uma notificação de push completa', () => {
    const notificacao = new NotificacaoBuilder()
      .setTitulo('Agendamento Confirmado')
      .setCorpo('Sua sessão de monitoria foi confirmada para amanhã.')
      .setDestinatario('uuid-aluno-123')
      .setTipo('push')
      .setAgendamento('AG-001')
      .build();

    expect(notificacao).toBeInstanceOf(Notificacao);
    expect(notificacao.titulo).toBe('Agendamento Confirmado');
    expect(notificacao.tipo).toBe('push');
    expect(notificacao.destinatarioId).toBe('uuid-aluno-123');
    expect(notificacao.agendamentoId).toBe('AG-001');
    expect(notificacao.criadaEm).toBeInstanceOf(Date);
  });

  it('deve construir uma notificação de email sem agendamento', () => {
    const notificacao = new NotificacaoBuilder()
      .setTitulo('Nova Avaliação')
      .setCorpo('Você recebeu uma nova avaliação.')
      .setDestinatario('uuid-monitor-456')
      .setTipo('email')
      .build();

    expect(notificacao.tipo).toBe('email');
    expect(notificacao.agendamentoId).toBeUndefined();
  });

  it('deve lançar erro se titulo nao for informado', () => {
    expect(() =>
      new NotificacaoBuilder()
        .setCorpo('corpo')
        .setDestinatario('uuid')
        .setTipo('push')
        .build(),
    ).toThrow('Título da notificação é obrigatório.');
  });

  it('deve lançar erro se destinatario nao for informado', () => {
    expect(() =>
      new NotificacaoBuilder()
        .setTitulo('titulo')
        .setCorpo('corpo')
        .setTipo('push')
        .build(),
    ).toThrow('Destinatário da notificação é obrigatório.');
  });

  it('deve lançar erro se tipo nao for informado', () => {
    expect(() =>
      new NotificacaoBuilder()
        .setTitulo('titulo')
        .setCorpo('corpo')
        .setDestinatario('uuid')
        .build(),
    ).toThrow('Tipo da notificação é obrigatório (push ou email).');
  });

  it('toString deve retornar representação legível da notificação', () => {
    const notificacao = new NotificacaoBuilder()
      .setTitulo('Cancelamento')
      .setCorpo('Sessão cancelada.')
      .setDestinatario('uuid-user')
      .setTipo('push')
      .setAgendamento('AG-002')
      .build();

    expect(notificacao.toString()).toContain('[PUSH]');
    expect(notificacao.toString()).toContain('Cancelamento');
    expect(notificacao.toString()).toContain('AG-002');
  });
});
