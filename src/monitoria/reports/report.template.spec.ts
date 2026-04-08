import { Monitoria } from '../entities/monitoria.entity';
import { ObjetivoMonitoria } from '../enums/objetivo-monitoria.enum';
import { HtmlReportTemplate } from './html-report.template';
import { PdfReportTemplate } from './pdf-report.template';

const makeMonitoria = (): Monitoria =>
  Object.assign(new Monitoria(), {
    idMonitoria: 1,
    titulo: 'Monitoria de Química',
    objetivo: ObjetivoMonitoria.PROVAS,
    materialApoio: true,
  });

describe('ReportTemplate (Template Method Pattern)', () => {
  it('HtmlReportTemplate deve gerar saída com tags HTML', async () => {
    const report = new HtmlReportTemplate();
    const output = await report.generate([makeMonitoria()]);
    expect(output).toContain('<html>');
    expect(output).toContain('Monitoria de Química');
    expect(output).toContain('</html>');
  });

  it('PdfReportTemplate deve gerar saída com cabeçalho simulado', async () => {
    const report = new PdfReportTemplate();
    const output = await report.generate([makeMonitoria()]);
    expect(output).toContain('PDF SIMULADO');
    expect(output).toContain('Monitoria de Química');
  });

  it('deve gerar relatório vazio quando lista for vazia', async () => {
    const htmlReport = new HtmlReportTemplate();
    const pdfReport = new PdfReportTemplate();
    const htmlOutput = await htmlReport.generate([]);
    const pdfOutput = await pdfReport.generate([]);
    expect(htmlOutput).toContain('<html>');
    expect(pdfOutput).toContain('PDF SIMULADO');
  });
});
