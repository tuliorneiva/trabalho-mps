import { HttpException, HttpStatus } from '@nestjs/common';
import { MonitoriaService } from './monitoria.service';
import { Monitoria } from './entities/monitoria.entity';
import { ObjetivoMonitoria } from './enums/objetivo-monitoria.enum';
import { IMonitoriaRepository } from './strategies/monitoria.repository.interface';

const makeMonitoria = (overrides: Partial<Monitoria> = {}): Monitoria =>
  Object.assign(new Monitoria(), {
    idMonitoria: 1,
    titulo: 'Monitoria de Álgebra',
    descricaoResumida: 'Matrizes e determinantes',
    objetivo: ObjetivoMonitoria.APROFUNDAMENTO,
    materialApoio: false,
    monitorId: 'uuid-monitor',
    alunoId: 'uuid-aluno',
    ...overrides,
  });

describe('MonitoriaService', () => {
  let service: MonitoriaService;
  let mockRepo: jest.Mocked<IMonitoriaRepository>;

  beforeEach(() => {
    mockRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    };
    service = new MonitoriaService(mockRepo);
  });

  describe('findAll', () => {
    it('deve retornar lista de monitorias', async () => {
      const lista = [makeMonitoria()];
      mockRepo.findAll.mockResolvedValue(lista);
      const result = await service.findAll();
      expect(result).toEqual(lista);
    });
  });

  describe('findById', () => {
    it('deve retornar a monitoria quando encontrada', async () => {
      const m = makeMonitoria();
      mockRepo.findById.mockResolvedValue(m);
      const result = await service.findById(1);
      expect(result).toEqual(m);
    });

    it('deve lançar HttpException NOT_FOUND quando nao encontrada', async () => {
      mockRepo.findById.mockResolvedValue(undefined);
      await expect(service.findById(999)).rejects.toThrow(
        new HttpException('Monitoria não encontrada', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('create', () => {
    it('deve criar e retornar a monitoria', async () => {
      const m = makeMonitoria();
      mockRepo.create.mockResolvedValue(m);
      const result = await service.create({
        titulo: 'Monitoria de Álgebra',
        descricaoResumida: 'Matrizes e determinantes',
        objetivo: ObjetivoMonitoria.APROFUNDAMENTO,
        materialApoio: false,
        monitorId: 'uuid-monitor',
        alunoId: 'uuid-aluno',
      });
      expect(result).toEqual(m);
      expect(mockRepo.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('deve atualizar, salvar memento e retornar a monitoria atualizada', async () => {
      const original = makeMonitoria();
      const atualizada = makeMonitoria({ titulo: 'Novo Titulo' });
      mockRepo.findById.mockResolvedValue(original);
      mockRepo.update.mockResolvedValue(atualizada);

      const result = await service.update(1, { titulo: 'Novo Titulo' });

      expect(result.titulo).toBe('Novo Titulo');
    });
  });

  describe('undo', () => {
    it('deve restaurar o estado anterior da monitoria', async () => {
      const original = makeMonitoria();
      const atualizada = makeMonitoria({ titulo: 'Novo Titulo' });

      mockRepo.findById.mockResolvedValue(original);
      mockRepo.update.mockResolvedValueOnce(atualizada);

      await service.update(1, { titulo: 'Novo Titulo' });

      mockRepo.update.mockResolvedValueOnce(original);
      const result = await service.undo(1);

      expect(result.titulo).toBe('Monitoria de Álgebra');
    });

    it('deve lançar NOT_FOUND se nao houver memento salvo para a monitoria', async () => {
      await expect(service.undo(999)).rejects.toThrow(
        new HttpException(
          'Nenhum estado anterior encontrado para esta monitoria',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('delete', () => {
    it('deve deletar a monitoria e retornar mensagem de sucesso', async () => {
      mockRepo.findById.mockResolvedValue(makeMonitoria());
      mockRepo.delete.mockResolvedValue(true);
      const result = await service.delete(1);
      expect(result).toEqual({ message: 'Monitoria deletada com sucesso' });
    });
  });

  describe('count', () => {
    it('deve retornar a contagem de monitorias', async () => {
      mockRepo.count.mockResolvedValue(5);
      expect(await service.count()).toBe(5);
    });
  });
});
