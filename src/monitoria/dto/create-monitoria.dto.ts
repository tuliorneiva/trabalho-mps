import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsBoolean,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ObjetivoMonitoria } from '../enums/objetivo-monitoria.enum';

export class CreateMonitoriaDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  titulo: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  descricaoResumida: string;

  @IsNotEmpty()
  @IsEnum(ObjetivoMonitoria)
  objetivo: ObjetivoMonitoria;

  @IsNotEmpty()
  @IsBoolean()
  materialApoio: boolean;

  @IsNotEmpty()
  @IsUUID()
  monitorId: string;

  @IsNotEmpty()
  @IsUUID()
  alunoId: string;
}
