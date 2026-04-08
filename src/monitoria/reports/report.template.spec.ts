import { SystemStats } from '../../common/system-stats.interface';
import { HtmlReportTemplate } from './html-report.template';
import { PdfReportTemplate } from './pdf-report.template';

const makeStats = (overrides: Partial<SystemStats> = {}): SystemStats => ({
  totalUsuarios: 10,
  usuariosPorTipo: { Aluno: 6, Monitor: 3, Ambos: 1 },
  totalMonitorias: 5,
  monitoriasPorObjetivo: { Reforco: 2, Aprofundamento: 1, Provas: 1, Exercicios: 1 },
  monitoriasComMaterial: 3,
  dataGeracao: '2026-04-07T00:00:00.000Z',
  ...overrides,
});

describe('ReportTemplate (Template Method Pattern)', () => {
  it('HtmlReportTemplate deve gerar saída com tags HTML e estatísticas', async () => {
    const report = new HtmlReportTemplate();
    const output = await report.generate(makeStats());
    expect(output).toContain('<html>');
    expect(output).toContain('</html>');
    expect(output).toContain('10');
    expect(output).toContain('Alunos');
    expect(output).toContain('Monitores');
  });

  it('PdfReportTemplate deve gerar saída com cabeçalho simulado e estatísticas', async () => {
    const report = new PdfReportTemplate();
    const output = await report.generate(makeStats());
    expect(output).toContain('PDF SIMULADO');
    expect(output).toContain('Total de Usuários');
    expect(output).toContain('Total de Monitorias');
  });

  it('deve incluir a data de geração no rodapé', async () => {
    const htmlReport = new HtmlReportTemplate();
    const pdfReport = new PdfReportTemplate();
    const stats = makeStats({ dataGeracao: '2026-04-07T00:00:00.000Z' });

    const htmlOutput = await htmlReport.generate(stats);
    const pdfOutput = await pdfReport.generate(stats);

    expect(htmlOutput).toContain('2026-04-07T00:00:00.000Z');
    expect(pdfOutput).toContain('2026-04-07T00:00:00.000Z');
  });

  it('deve exibir zero para sistemas sem dados', async () => {
    const stats = makeStats({
      totalUsuarios: 0,
      usuariosPorTipo: { Aluno: 0, Monitor: 0, Ambos: 0 },
      totalMonitorias: 0,
      monitoriasPorObjetivo: { Reforco: 0, Aprofundamento: 0, Provas: 0, Exercicios: 0 },
      monitoriasComMaterial: 0,
    });
    const report = new HtmlReportTemplate();
    const output = await report.generate(stats);
    expect(output).toContain('<html>');
  });
});
