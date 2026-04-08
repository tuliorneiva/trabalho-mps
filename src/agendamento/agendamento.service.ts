import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Agendamento } from './agendamento';

@Injectable()
export class AgendamentoService {
  private readonly agendamentos = new Map<number, Agendamento>();
  private nextId = 1;

  criar(monitoriaId: number, alunoId: string): Agendamento {
    const agendamento = new Agendamento(this.nextId++, monitoriaId, alunoId);
    this.agendamentos.set(agendamento.id, agendamento);
    return agendamento;
  }

  findById(id: number): Agendamento {
    const ag = this.agendamentos.get(id);
    if (!ag) {
      throw new HttpException('Agendamento não encontrado', HttpStatus.NOT_FOUND);
    }
    return ag;
  }

  findAll(): Agendamento[] {
    return Array.from(this.agendamentos.values());
  }

  confirmar(id: number): Agendamento {
    const ag = this.findById(id);
    ag.confirmar();
    return ag;
  }

  cancelar(id: number): Agendamento {
    const ag = this.findById(id);
    ag.cancelar();
    return ag;
  }

  concluir(id: number): Agendamento {
    const ag = this.findById(id);
    ag.concluir();
    return ag;
  }
}
