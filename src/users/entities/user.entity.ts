import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { TipoUsuario } from "../enums/tipo-usuario.enum";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  nomeCompleto: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  senha: string;

  @Column({ type: "enum", enum: TipoUsuario, default: TipoUsuario.ALUNO })
  tipoUsuario: TipoUsuario;

  @Column({ type: "varchar", length: 255, nullable: true })
  curso: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  matricula: string;

  @Column({ type: "boolean", default: true })
  statusConta: boolean;

  @Column({ type: "simple-array", nullable: true })
  permissoes: string[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
