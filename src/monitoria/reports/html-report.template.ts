import { ReportTemplate } from './report.template';
import { SystemStats } from '../../common/system-stats.interface';

export class HtmlReportTemplate extends ReportTemplate {
  protected formatHeader(): string {
    return (
      '<html><head><title>Relatório de Estatísticas — SOS Universitários</title></head><body>' +
      '<h1>Relatório de Estatísticas do Sistema</h1>'
    );
  }

  protected formatBody(stats: SystemStats): string {
    return (
      '<h2>Usuários</h2>' +
      '<table border="1">' +
      '<tr><th>Total de Usuários</th><td>' + stats.totalUsuarios + '</td></tr>' +
      '<tr><th>Alunos</th><td>' + stats.usuariosPorTipo.Aluno + '</td></tr>' +
      '<tr><th>Monitores</th><td>' + stats.usuariosPorTipo.Monitor + '</td></tr>' +
      '<tr><th>Ambos (Aluno + Monitor)</th><td>' + stats.usuariosPorTipo.Ambos + '</td></tr>' +
      '</table>' +
      '<h2>Monitorias</h2>' +
      '<table border="1">' +
      '<tr><th>Total de Monitorias</th><td>' + stats.totalMonitorias + '</td></tr>' +
      '<tr><th>Reforço</th><td>' + stats.monitoriasPorObjetivo.Reforco + '</td></tr>' +
      '<tr><th>Aprofundamento</th><td>' + stats.monitoriasPorObjetivo.Aprofundamento + '</td></tr>' +
      '<tr><th>Provas</th><td>' + stats.monitoriasPorObjetivo.Provas + '</td></tr>' +
      '<tr><th>Exercícios</th><td>' + stats.monitoriasPorObjetivo.Exercicios + '</td></tr>' +
      '<tr><th>Com Material de Apoio</th><td>' + stats.monitoriasComMaterial + '</td></tr>' +
      '</table>'
    );
  }

  protected formatFooter(dataGeracao: string): string {
    return `<footer><p>Gerado em: ${dataGeracao}</p></footer></body></html>`;
  }

  protected buildOutput(header: string, body: string, footer: string): string {
    return `${header}${body}${footer}`;
  }
}
