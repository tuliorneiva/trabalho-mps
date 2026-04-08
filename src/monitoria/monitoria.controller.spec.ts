import { Test, TestingModule } from '@nestjs/testing';
import { MonitoriaController } from './monitoria.controller';
import { MonitoriaService } from './monitoria.service';
import { Monitoria } from './entities/monitoria.entity';
import { ObjetivoMonitoria } from './enums/objetivo-monitoria.enum';

const makeMonitoria = (): Monitoria =>
  Object.assign(new Monitoria(), {
    idMonitoria: 1,
    titulo: 'Monitoria de Filosofia',
    descricaoResumida: 'Epistemologia',
    objetivo: ObjetivoMonitoria.APROFUNDAMENTO,
    materialApoio: true,
    monitorId: 'uuid-monitor',
    alunoId: 'uuid-aluno',
  });

describe('MonitoriaController', () => {
  let controller: MonitoriaController;
  let service: jest.Mocked<MonitoriaService>;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      undo: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitoriaController],
      providers: [{ provide: MonitoriaService, useValue: mockService }],
    }).compile();

    controller = module.get<MonitoriaController>(MonitoriaController);
    service = module.get(MonitoriaService);
  });

  it('findAll deve retornar lista de monitorias', async () => {
    service.findAll.mockResolvedValue([makeMonitoria()]);
    const result = await controller.findAll();
    expect(result).toHaveLength(1);
  });

  it('findById deve retornar monitoria pelo id', async () => {
    service.findById.mockResolvedValue(makeMonitoria());
    const result = await controller.findById(1);
    expect(result.idMonitoria).toBe(1);
  });

  it('create deve retornar a monitoria criada', async () => {
    service.create.mockResolvedValue(makeMonitoria());
    const result = await controller.create({
      titulo: 'Monitoria de Filosofia',
      descricaoResumida: 'Epistemologia',
      objetivo: ObjetivoMonitoria.APROFUNDAMENTO,
      materialApoio: true,
      monitorId: 'uuid-monitor',
      alunoId: 'uuid-aluno',
    });
    expect(result.titulo).toBe('Monitoria de Filosofia');
  });

  it('update deve retornar a monitoria atualizada', async () => {
    const atualizada = makeMonitoria();
    atualizada.titulo = 'Titulo Atualizado';
    service.update.mockResolvedValue(atualizada);
    const result = await controller.update(1, { titulo: 'Titulo Atualizado' });
    expect(result.titulo).toBe('Titulo Atualizado');
  });

  it('undo deve retornar o estado anterior', async () => {
    service.undo.mockResolvedValue(makeMonitoria());
    const result = await controller.undo(1);
    expect(result.idMonitoria).toBe(1);
  });

  it('delete deve retornar mensagem de sucesso', async () => {
    service.delete.mockResolvedValue({ message: 'Monitoria deletada com sucesso' });
    const result = await controller.delete(1);
    expect(result.message).toBe('Monitoria deletada com sucesso');
  });
});
