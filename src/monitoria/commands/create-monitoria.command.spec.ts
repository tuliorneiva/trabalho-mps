import { CreateMonitoriaCommand } from './create-monitoria.command';
import { Monitoria } from '../entities/monitoria.entity';
import { ObjetivoMonitoria } from '../enums/objetivo-monitoria.enum';
import { IMonitoriaRepository } from '../strategies/monitoria.repository.interface';
import { ILogger } from '../../common/log.adapter';

describe('CreateMonitoriaCommand (Command Pattern)', () => {
  const mockLogger: ILogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  };

  it('deve chamar repo.create e retornar a monitoria criada', async () => {
    const monitoriaEsperada: Monitoria = Object.assign(new Monitoria(), {
      idMonitoria: 1,
      titulo: 'Monitoria de Física',
      descricaoResumida: 'Mecânica clássica',
      objetivo: ObjetivoMonitoria.EXERCICIOS,
      materialApoio: false,
      monitorId: 'uuid-monitor',
      alunoId: 'uuid-aluno',
    });

    const mockRepo: Partial<IMonitoriaRepository> = {
      create: jest.fn().mockResolvedValue(monitoriaEsperada),
    };

    const command = new CreateMonitoriaCommand(
      mockRepo as IMonitoriaRepository,
      { titulo: 'Monitoria de Física' },
      mockLogger,
    );

    const result = await command.execute();

    expect(mockRepo.create).toHaveBeenCalledWith({ titulo: 'Monitoria de Física' });
    expect(result).toEqual(monitoriaEsperada);
    expect(mockLogger.log).toHaveBeenCalled();
  });
});
