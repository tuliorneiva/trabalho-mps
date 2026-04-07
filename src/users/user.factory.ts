import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { TipoUsuario } from "./enums/tipo-usuario.enum";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserFactory {
  createUserFromDto(dto: CreateUserDTO): User {
    const user = new User();
    user.nomeCompleto = dto.nomeCompleto;
    user.email = dto.email;
    user.senha = dto.senha;
    user.tipoUsuario = dto.tipoUsuario;
    user.curso = dto.curso;
    user.matricula = dto.matricula;
    user.statusConta = true;

    switch (dto.tipoUsuario) {
      case TipoUsuario.ALUNO:
        user.permissoes = [
          "SOLICITAR_AGENDAMENTO",
          "AVALIAR_MONITOR",
          "USAR_CHAT",
        ];
        break;
      case TipoUsuario.MONITOR:
        user.permissoes = [
          "ACEITAR_AGENDAMENTO",
          "RECUSAR_AGENDAMENTO",
          "USAR_CHAT",
        ];
        break;
      case TipoUsuario.AMBOS:
        user.permissoes = [
          "SOLICITAR_AGENDAMENTO",
          "AVALIAR_MONITOR",
          "ACEITAR_AGENDAMENTO",
          "RECUSAR_AGENDAMENTO",
          "USAR_CHAT",
        ];
        break;
      default:
        user.permissoes = [];
    }

    return user;
  }
}
