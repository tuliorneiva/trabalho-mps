import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { Agendamento } from './agendamento';

class CriarAgendamentoDTO {
  monitoriaId: number;
  alunoId: string;
}

@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Get()
  findAll(): { id: number; monitoriaId: number; alunoId: string; status: string }[] {
    return this.agendamentoService.findAll().map(this.toResponse);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.toResponse(this.agendamentoService.findById(id));
  }

  @Post()
  criar(@Body() dto: CriarAgendamentoDTO) {
    return this.toResponse(
      this.agendamentoService.criar(dto.monitoriaId, dto.alunoId),
    );
  }

  @Post(':id/confirmar')
  confirmar(@Param('id', ParseIntPipe) id: number) {
    return this.toResponse(this.agendamentoService.confirmar(id));
  }

  @Post(':id/cancelar')
  cancelar(@Param('id', ParseIntPipe) id: number) {
    return this.toResponse(this.agendamentoService.cancelar(id));
  }

  @Post(':id/concluir')
  concluir(@Param('id', ParseIntPipe) id: number) {
    return this.toResponse(this.agendamentoService.concluir(id));
  }

  private toResponse(ag: Agendamento) {
    return {
      id: ag.id,
      monitoriaId: ag.monitoriaId,
      alunoId: ag.alunoId,
      status: ag.getStatus(),
    };
  }
}
