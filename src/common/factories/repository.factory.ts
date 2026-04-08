import { IUsersRepository } from '../../users/strategies/users.repository.interface';
import { IMonitoriaRepository } from '../../monitoria/strategies/monitoria.repository.interface';

/**
 * Abstract Factory — define a interface para criação de famílias de repositórios
 * sem especificar suas classes concretas.
 *
 * Cada Factory Method cria um repositório para uma entidade do domínio.
 * Subclasses concretas decidem qual implementação instanciar
 * (TypeORM para produção, InMemory para testes/dev).
 *
 * Padrão: Abstract Factory + Factory Method (GoF Criacional)
 */
export abstract class RepositoryFactory {
  /**
   * Factory Method — cria o repositório de usuários.
   */
  abstract createUsersRepository(): IUsersRepository;

  /**
   * Factory Method — cria o repositório de monitorias.
   */
  abstract createMonitoriaRepository(): IMonitoriaRepository;
}
