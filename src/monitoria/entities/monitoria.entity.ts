import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ObjetivoMonitoria } from '../enums/objetivo-monitoria.enum';

@Entity('monitorias')
export class Monitoria {
  @PrimaryGeneratedColumn()
  idMonitoria: number;

  @Column({ type: 'varchar', length: 100 })
  titulo: string;

  @Column({ type: 'varchar', length: 200 })
  descricaoResumida: string;

  @Column({ type: 'enum', enum: ObjetivoMonitoria })
  objetivo: ObjetivoMonitoria;

  @Column({ type: 'boolean' })
  materialApoio: boolean;

  @ManyToOne(() => User, { eager: false, nullable: false })
  @JoinColumn({ name: 'monitorId' })
  monitor: User;

  @Column({ type: 'uuid' })
  monitorId: string;

  @ManyToOne(() => User, { eager: false, nullable: false })
  @JoinColumn({ name: 'alunoId' })
  aluno: User;

  @Column({ type: 'uuid' })
  alunoId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
