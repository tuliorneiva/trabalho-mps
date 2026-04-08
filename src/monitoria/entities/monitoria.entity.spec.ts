import { Monitoria } from './monitoria.entity';
import { ObjetivoMonitoria } from '../enums/objetivo-monitoria.enum';

describe('Monitoria Entity', () => {
  it('deve instanciar com os atributos corretos', () => {
    const m = new Monitoria();
    m.titulo = 'Cálculo I';
    m.descricaoResumida = 'Reforço de limites';
    m.objetivo = ObjetivoMonitoria.REFORCO;
    m.materialApoio = true;
    m.monitorId = 'uuid-monitor';
    m.alunoId = 'uuid-aluno';

    expect(m.titulo).toBe('Cálculo I');
    expect(m.objetivo).toBe(ObjetivoMonitoria.REFORCO);
    expect(m.materialApoio).toBe(true);
    expect(m.monitorId).toBe('uuid-monitor');
  });
});
