import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
} from "class-validator";
import { TipoUsuario } from "../enums/tipo-usuario.enum";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly nomeCompleto: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  readonly senha: string;

  @IsNotEmpty()
  @IsEnum(TipoUsuario)
  readonly tipoUsuario: TipoUsuario;

  @IsOptional()
  @IsString()
  readonly curso?: string;

  @IsOptional()
  @IsString()
  readonly matricula?: string;
}
