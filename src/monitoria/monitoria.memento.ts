import { Monitoria } from './entities/monitoria.entity';

/**
 * Memento — armazena um snapshot do estado de uma Monitoria antes da atualização.
 * Permite restaurar o estado anterior via undo().
 * Padrão: Memento (GoF Comportamental)
 */
export class MonitoriaMemento {
  private readonly state: Partial<Monitoria>;

  constructor(monitoria: Monitoria) {
    this.state = {
      titulo: monitoria.titulo,
      descricaoResumida: monitoria.descricaoResumida,
      objetivo: monitoria.objetivo,
      materialApoio: monitoria.materialApoio,
      monitorId: monitoria.monitorId,
      alunoId: monitoria.alunoId,
    };
  }

  getState(): Partial<Monitoria> {
    return { ...this.state };
  }
}
