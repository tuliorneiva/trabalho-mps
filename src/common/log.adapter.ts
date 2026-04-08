import { Logger } from '@nestjs/common';

/**
 * Interface do Adapter — desacopla o código de negócio da lib de log concreta.
 * Padrão: Adapter (GoF Estrutural)
 */
export interface ILogger {
  log(message: string, context?: string): void;
  error(message: string, trace?: string, context?: string): void;
  warn(message: string, context?: string): void;
}

/**
 * Adaptador concreto: envolve o Logger do NestJS na interface ILogger.
 * Trocar a lib de log significa criar um novo Adapter sem alterar o código cliente.
 */
export class NestLoggerAdapter implements ILogger {
  private readonly logger: Logger;

  constructor(context: string) {
    this.logger = new Logger(context);
  }

  log(message: string, context?: string): void {
    this.logger.log(message, context);
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, trace, context);
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, context);
  }
}
