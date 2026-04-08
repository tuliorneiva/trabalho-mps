import { HttpException, HttpStatus } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';

describe('AgendamentoService (State Pattern)', () => {
  let service: AgendamentoService;

  beforeEach(() => {
    service = new AgendamentoService();
  });

  it('deve criar agendamento com status Solicitado', () => {
    const ag = service.criar(1, 'uuid-aluno');
    expect(ag.getStatus()).toBe('Solicitado');
  });

  it('deve confirmar um agendamento solicitado', () => {
    const ag = service.criar(1, 'uuid-aluno');
    service.confirmar(ag.id);
    expect(service.findById(ag.id).getStatus()).toBe('Confirmado');
  });

  it('deve cancelar um agendamento solicitado', () => {
    const ag = service.criar(1, 'uuid-aluno');
    service.cancelar(ag.id);
    expect(service.findById(ag.id).getStatus()).toBe('Cancelado');
  });

  it('deve cancelar um agendamento confirmado', () => {
    const ag = service.criar(1, 'uuid-aluno');
    service.confirmar(ag.id);
    service.cancelar(ag.id);
    expect(service.findById(ag.id).getStatus()).toBe('Cancelado');
  });

  it('deve concluir um agendamento confirmado', () => {
    const ag = service.criar(1, 'uuid-aluno');
    service.confirmar(ag.id);
    service.concluir(ag.id);
    expect(service.findById(ag.id).getStatus()).toBe('Concluido');
  });

  it('nao deve concluir um agendamento solicitado', () => {
    const ag = service.criar(1, 'uuid-aluno');
    expect(() => service.concluir(ag.id)).toThrow(
      'Não é possível concluir um agendamento ainda não confirmado.',
    );
  });

  it('nao deve confirmar um agendamento cancelado', () => {
    const ag = service.criar(1, 'uuid-aluno');
    service.cancelar(ag.id);
    expect(() => service.confirmar(ag.id)).toThrow(
      'Agendamento cancelado não pode ser confirmado.',
    );
  });

  it('nao deve cancelar um agendamento concluido', () => {
    const ag = service.criar(1, 'uuid-aluno');
    service.confirmar(ag.id);
    service.concluir(ag.id);
    expect(() => service.cancelar(ag.id)).toThrow(
      'Agendamento concluído não pode ser cancelado.',
    );
  });

  it('deve lançar NOT_FOUND para agendamento inexistente', () => {
    expect(() => service.findById(999)).toThrow(
      new HttpException('Agendamento não encontrado', HttpStatus.NOT_FOUND),
    );
  });
});
