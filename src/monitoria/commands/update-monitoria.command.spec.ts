import { UpdateMonitoriaCommand } from './update-monitoria.command';
import { Monitoria } from '../entities/monitoria.entity';
import { ObjetivoMonitoria } from '../enums/objetivo-monitoria.enum';
import { IMonitoriaRepository } from '../strategies/monitoria.repository.interface';
import { ILogger } from '../../common/log.adapter';

describe('UpdateMonitoriaCommand (Command + Memento)', () => {
  const mockLogger: ILogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  };

  it('deve atualizar a monitoria e retornar o memento com o estado anterior', async () => {
    const estadoAtual: Monitoria = Object.assign(new Monitoria(), {
      idMonitoria: 1,
      titulo: 'Titulo Original',
      descricaoResumida: 'Desc original',
      objetivo: ObjetivoMonitoria.REFORCO,
      materialApoio: false,
      monitorId: 'uuid-monitor',
      alunoId: 'uuid-aluno',
    });

    const estadoAtualizado: Monitoria = Object.assign(new Monitoria(), {
      ...estadoAtual,
      titulo: 'Titulo Atualizado',
    });

    const mockRepo: Partial<IMonitoriaRepository> = {
      update: jest.fn().mockResolvedValue(estadoAtualizado),
    };

    const command = new UpdateMonitoriaCommand(
      mockRepo as IMonitoriaRepository,
      1,
      { titulo: 'Titulo Atualizado' },
      estadoAtual,
      mockLogger,
    );

    const { monitoria, memento } = await command.execute();

    expect(monitoria.titulo).toBe('Titulo Atualizado');
    expect(memento.getState().titulo).toBe('Titulo Original');
    expect(mockRepo.update).toHaveBeenCalledWith(1, { titulo: 'Titulo Atualizado' });
  });
});
