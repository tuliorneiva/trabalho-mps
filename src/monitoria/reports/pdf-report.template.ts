import { ReportTemplate } from './report.template';
import { SystemStats } from '../../common/system-stats.interface';

export class PdfReportTemplate extends ReportTemplate {
  protected formatHeader(): string {
    return '=== RELATÓRIO DE ESTATÍSTICAS — SOS UNIVERSITÁRIOS (PDF SIMULADO) ===';
  }

  protected formatBody(stats: SystemStats): string {
    return (
      '\n--- USUÁRIOS ---\n' +
      `Total de Usuários   : ${stats.totalUsuarios}\n` +
      `  Alunos            : ${stats.usuariosPorTipo.Aluno}\n` +
      `  Monitores         : ${stats.usuariosPorTipo.Monitor}\n` +
      `  Ambos             : ${stats.usuariosPorTipo.Ambos}\n` +
      '\n--- MONITORIAS ---\n' +
      `Total de Monitorias : ${stats.totalMonitorias}\n` +
      `  Reforço           : ${stats.monitoriasPorObjetivo.Reforco}\n` +
      `  Aprofundamento    : ${stats.monitoriasPorObjetivo.Aprofundamento}\n` +
      `  Provas            : ${stats.monitoriasPorObjetivo.Provas}\n` +
      `  Exercícios        : ${stats.monitoriasPorObjetivo.Exercicios}\n` +
      `  Com Material      : ${stats.monitoriasComMaterial}\n`
    );
  }

  protected formatFooter(dataGeracao: string): string {
    return `=== Gerado em: ${dataGeracao} ===`;
  }

  protected buildOutput(header: string, body: string, footer: string): string {
    return `${header}${body}${footer}`;
  }
}
