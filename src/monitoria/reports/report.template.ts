import { Monitoria } from '../entities/monitoria.entity';

/**
 * Define o esqueleto do algoritmo de geração de relatório.
 * As subclasses implementam os passos concretos sem alterar a estrutura.
 * Padrão: Template Method (GoF Comportamental)
 */
export abstract class ReportTemplate {
  async generate(data: Monitoria[]): Promise<string> {
    const header = this.formatHeader();
    const body = this.formatBody(data);
    const footer = this.formatFooter();
    return this.buildOutput(header, body, footer);
  }

  protected abstract formatHeader(): string;
  protected abstract formatBody(data: Monitoria[]): string;
  protected abstract formatFooter(): string;
  protected abstract buildOutput(
    header: string,
    body: string,
    footer: string,
  ): string;
}
