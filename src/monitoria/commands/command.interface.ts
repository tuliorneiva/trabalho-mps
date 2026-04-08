/**
 * Interface genérica do padrão Command.
 * Padrão: Command (GoF Comportamental)
 */
export interface ICommand<T = void> {
  execute(): Promise<T>;
}
