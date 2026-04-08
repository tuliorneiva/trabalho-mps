import { SystemStats } from '../../common/system-stats.interface';

/**
 * Define o esqueleto do algoritmo de geração de relatório de estatísticas.
 * As subclasses implementam os passos concretos sem alterar a estrutura.
 * Padrão: Template Method (GoF Comportamental)
 */
export abstract class ReportTemplate {
  async generate(stats: SystemStats): Promise<string> {
    const header = this.formatHeader();
    const body = this.formatBody(stats);
    const footer = this.formatFooter(stats.dataGeracao);
    return this.buildOutput(header, body, footer);
  }

  protected abstract formatHeader(): string;
  protected abstract formatBody(stats: SystemStats): string;
  protected abstract formatFooter(dataGeracao: string): string;
  protected abstract buildOutput(
    header: string,
    body: string,
    footer: string,
  ): string;
}
