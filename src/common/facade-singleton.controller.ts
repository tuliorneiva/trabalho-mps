import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MonitoriaService } from '../monitoria/monitoria.service';
import { User } from '../users/entities/user.entity';
import { Monitoria } from '../monitoria/entities/monitoria.entity';
import { TipoUsuario } from '../users/enums/tipo-usuario.enum';
import { ObjetivoMonitoria } from '../monitoria/enums/objetivo-monitoria.enum';
import { SystemStats } from './system-stats.interface';
import { HtmlReportTemplate } from '../monitoria/reports/html-report.template';
import { PdfReportTemplate } from '../monitoria/reports/pdf-report.template';

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

  @Get('reports/html')
  async getHtmlReport(): Promise<string> {
    const stats = await this.buildSystemStats();
    return new HtmlReportTemplate().generate(stats);
  }

  @Get('reports/pdf')
  async getPdfReport(): Promise<string> {
    const stats = await this.buildSystemStats();
    return new PdfReportTemplate().generate(stats);
  }

  private async buildSystemStats(): Promise<SystemStats> {
    const [users, monitorias] = await Promise.all([
      this.usersService.getAllUsers(),
      this.monitoriaService.findAll(),
    ]);

    return {
      totalUsuarios: users.length,
      usuariosPorTipo: {
        Aluno: users.filter((u) => u.tipoUsuario === TipoUsuario.ALUNO).length,
        Monitor: users.filter((u) => u.tipoUsuario === TipoUsuario.MONITOR).length,
        Ambos: users.filter((u) => u.tipoUsuario === TipoUsuario.AMBOS).length,
      },
      totalMonitorias: monitorias.length,
      monitoriasPorObjetivo: {
        Reforco: monitorias.filter((m) => m.objetivo === ObjetivoMonitoria.REFORCO).length,
        Aprofundamento: monitorias.filter((m) => m.objetivo === ObjetivoMonitoria.APROFUNDAMENTO).length,
        Provas: monitorias.filter((m) => m.objetivo === ObjetivoMonitoria.PROVAS).length,
        Exercicios: monitorias.filter((m) => m.objetivo === ObjetivoMonitoria.EXERCICIOS).length,
      },
      monitoriasComMaterial: monitorias.filter((m) => m.materialApoio).length,
      dataGeracao: new Date().toISOString(),
    };
  }
}
