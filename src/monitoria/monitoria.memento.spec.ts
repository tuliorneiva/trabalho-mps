import { Monitoria } from './entities/monitoria.entity';
import { MonitoriaMemento } from './monitoria.memento';
import { ObjetivoMonitoria } from './enums/objetivo-monitoria.enum';

describe('MonitoriaMemento (Memento Pattern)', () => {
  let monitoria: Monitoria;

  beforeEach(() => {
    monitoria = new Monitoria();
    monitoria.idMonitoria = 1;
    monitoria.titulo = 'Cálculo I';
    monitoria.descricaoResumida = 'Reforço de limites';
    monitoria.objetivo = ObjetivoMonitoria.REFORCO;
    monitoria.materialApoio = true;
    monitoria.monitorId = 'uuid-monitor';
    monitoria.alunoId = 'uuid-aluno';
  });

  it('deve armazenar o estado da monitoria no momento da criação do memento', () => {
    const memento = new MonitoriaMemento(monitoria);
    const state = memento.getState();

    expect(state.titulo).toBe('Cálculo I');
    expect(state.objetivo).toBe(ObjetivoMonitoria.REFORCO);
    expect(state.materialApoio).toBe(true);
    expect(state.monitorId).toBe('uuid-monitor');
    expect(state.alunoId).toBe('uuid-aluno');
  });

  it('deve retornar uma cópia do estado, nao a referência original', () => {
    const memento = new MonitoriaMemento(monitoria);
    const state = memento.getState();

    state.titulo = 'Modificado';

    expect(memento.getState().titulo).toBe('Cálculo I');
  });

  it('nao deve ser afetado por alterações posteriores no objeto original', () => {
    const memento = new MonitoriaMemento(monitoria);
    monitoria.titulo = 'Novo Titulo';

    expect(memento.getState().titulo).toBe('Cálculo I');
  });
});
