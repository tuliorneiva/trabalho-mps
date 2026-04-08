/**
 * Representa as estatísticas consolidadas do sistema SOS Universitários.
 * Usada pela camada de relatórios (Template Method) para geração de saída.
 */
export interface SystemStats {
  totalUsuarios: number;
  usuariosPorTipo: {
    Aluno: number;
    Monitor: number;
    Ambos: number;
  };
  totalMonitorias: number;
  monitoriasPorObjetivo: {
    Reforco: number;
    Aprofundamento: number;
    Provas: number;
    Exercicios: number;
  };
  monitoriasComMaterial: number;
  dataGeracao: string;
}
