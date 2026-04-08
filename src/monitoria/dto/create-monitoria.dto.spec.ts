import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateMonitoriaDTO } from './create-monitoria.dto';
import { ObjetivoMonitoria } from '../enums/objetivo-monitoria.enum';

describe('CreateMonitoriaDTO', () => {
  it('deve validar um DTO correto sem erros', async () => {
    const dto = plainToInstance(CreateMonitoriaDTO, {
      titulo: 'Monitoria de Álgebra',
      descricaoResumida: 'Foco em matrizes e determinantes',
      objetivo: ObjetivoMonitoria.APROFUNDAMENTO,
      materialApoio: false,
      monitorId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      alunoId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('deve falhar se titulo for vazio', async () => {
    const dto = plainToInstance(CreateMonitoriaDTO, {
      titulo: '',
      descricaoResumida: 'desc',
      objetivo: ObjetivoMonitoria.PROVAS,
      materialApoio: true,
      monitorId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      alunoId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    });
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'titulo')).toBe(true);
  });

  it('deve falhar se objetivo nao for um valor do enum', async () => {
    const dto = plainToInstance(CreateMonitoriaDTO, {
      titulo: 'Titulo',
      descricaoResumida: 'desc',
      objetivo: 'INVALIDO',
      materialApoio: true,
      monitorId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      alunoId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    });
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'objetivo')).toBe(true);
  });
});
