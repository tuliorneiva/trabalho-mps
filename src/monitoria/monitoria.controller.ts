import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MonitoriaService } from './monitoria.service';
import { CreateMonitoriaDTO } from './dto/create-monitoria.dto';
import { UpdateMonitoriaDTO } from './dto/update-monitoria.dto';
import { Monitoria } from './entities/monitoria.entity';
import { HtmlReportTemplate } from './reports/html-report.template';
import { PdfReportTemplate } from './reports/pdf-report.template';

@Controller('monitoria')
export class MonitoriaController {
  constructor(private readonly monitoriaService: MonitoriaService) {}

  @Get()
  findAll(): Promise<Monitoria[]> {
    return this.monitoriaService.findAll();
  }

  @Get('reports/html')
  async getHtmlReport(): Promise<string> {
    const data = await this.monitoriaService.findAll();
    return new HtmlReportTemplate().generate(data);
  }

  @Get('reports/pdf')
  async getPdfReport(): Promise<string> {
    const data = await this.monitoriaService.findAll();
    return new PdfReportTemplate().generate(data);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Monitoria> {
    return this.monitoriaService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateMonitoriaDTO): Promise<Monitoria> {
    return this.monitoriaService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMonitoriaDTO,
  ): Promise<Monitoria> {
    return this.monitoriaService.update(id, dto);
  }

  @Post(':id/undo')
  undo(@Param('id', ParseIntPipe) id: number): Promise<Monitoria> {
    return this.monitoriaService.undo(id);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.monitoriaService.delete(id);
  }
}
