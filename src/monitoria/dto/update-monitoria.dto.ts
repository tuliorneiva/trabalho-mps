import { PartialType } from '@nestjs/mapped-types';
import { CreateMonitoriaDTO } from './create-monitoria.dto';

export class UpdateMonitoriaDTO extends PartialType(CreateMonitoriaDTO) {}
