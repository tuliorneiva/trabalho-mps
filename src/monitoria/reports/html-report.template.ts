import { ReportTemplate } from './report.template';
import { Monitoria } from '../entities/monitoria.entity';

export class HtmlReportTemplate extends ReportTemplate {
  protected formatHeader(): string {
    return '<html><head><title>Relatório de Monitorias</title></head><body>';
  }

  protected formatBody(data: Monitoria[]): string {
    const rows = data
      .map(
        (m) =>
          `<tr><td>${m.idMonitoria}</td><td>${m.titulo}</td><td>${m.objetivo}</td>` +
          `<td>${m.materialApoio ? 'Sim' : 'Não'}</td></tr>`,
      )
      .join('');
    return (
      `<table><thead><tr><th>ID</th><th>Título</th><th>Objetivo</th>` +
      `<th>Material de Apoio</th></tr></thead><tbody>${rows}</tbody></table>`
    );
  }

  protected formatFooter(): string {
    return `<footer>Gerado em: ${new Date().toISOString()}</footer></body></html>`;
  }

  protected buildOutput(header: string, body: string, footer: string): string {
    return `${header}${body}${footer}`;
  }
}
