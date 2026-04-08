import { ReportTemplate } from './report.template';
import { Monitoria } from '../entities/monitoria.entity';

export class PdfReportTemplate extends ReportTemplate {
  protected formatHeader(): string {
    return '=== RELATÓRIO DE MONITORIAS (PDF SIMULADO) ===';
  }

  protected formatBody(data: Monitoria[]): string {
    return data
      .map(
        (m) =>
          `| ${m.idMonitoria} | ${m.titulo} | ${m.objetivo} | ` +
          `Material: ${m.materialApoio ? 'Sim' : 'Não'} |`,
      )
      .join('\n');
  }

  protected formatFooter(): string {
    return `\n=== Gerado em: ${new Date().toISOString()} ===`;
  }

  protected buildOutput(header: string, body: string, footer: string): string {
    return `${header}\n${body}${footer}`;
  }
}
