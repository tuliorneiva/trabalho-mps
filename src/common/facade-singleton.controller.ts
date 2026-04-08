import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MonitoriaService } from '../monitoria/monitoria.service';
import { User } from '../users/entities/user.entity';
import { Monitoria } from '../monitoria/entities/monitoria.entity';

/**
 * Fachada Única que centraliza o acesso aos serviços principais do sistema.
 * Implementa o padrão Singleton garantindo uma única instância da fachada.
 * Padrões: Facade + Singleton (GoF Estrutural/Criacional)
 */
@Controller('facade')
export class FacadeSingletonController {
  private static instance: FacadeSingletonController | null = null;

  constructor(
    private readonly usersService: UsersService,
    private readonly monitoriaService: MonitoriaService,
  ) {
    if (FacadeSingletonController.instance) {
      return FacadeSingletonController.instance;
    }
    FacadeSingletonController.instance = this;
  }

  @Get('statistics')
  async getSystemStatistics(): Promise<{
    totalUsers: number;
    totalMonitorias: number;
  }> {
    const [users, totalMonitorias] = await Promise.all([
      this.usersService.getAllUsers(),
      this.monitoriaService.count(),
    ]);
    return {
      totalUsers: users.length,
      totalMonitorias,
    };
  }

  @Get('users')
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get('monitorias')
  getAllMonitorias(): Promise<Monitoria[]> {
    return this.monitoriaService.findAll();
  }
}
