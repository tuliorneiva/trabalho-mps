import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import type { IUsersRepository } from "./strategies/users.repository.interface";
import { USERS_REPOSITORY } from "./strategies/users.repository.interface";
import { UserFactory } from "./user.factory";
import {
  ISubject,
  IObserver,
  NotificationObserver,
} from "./notifications.observer";

@Injectable()
export class UsersService implements ISubject {
  private observers: IObserver[] = [];

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    private readonly userFactory: UserFactory,
  ) {
    this.addObserver(new NotificationObserver());
  }

  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(agendamentoId: string, novoStatus: string): void {
    for (const observer of this.observers) {
      observer.update(agendamentoId, novoStatus);
    }
  }

  simularMudancaDeStatusDoAgendamento(
    agendamentoId: string,
    novoStatus: string,
  ): void {
    this.notifyObservers(agendamentoId, novoStatus);
  }

  async getAllUsers(limit?: number, offset?: number): Promise<User[]> {
    return this.usersRepository.findAll(limit, offset);
  }

  async findOneUser(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const existingByEmail = await this.usersRepository.findByEmail(
      createUserDTO.email,
    );
    if (existingByEmail) {
      throw new HttpException("Email already registered", HttpStatus.CONFLICT);
    }

    const userEntity = this.userFactory.createUserFromDto(createUserDTO);

    const savedUser = await this.usersRepository.create(userEntity);

    // Simulando a aprovação de uma solicitação de monitoria por parte do usuário recém criado
    this.simularMudancaDeStatusDoAgendamento(
      `AG-${savedUser.id || Math.floor(Math.random() * 1000)}`,
      "Confirmado",
    );

    return savedUser;
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.findOneUser(id);

    if (updateUserDTO.email && updateUserDTO.email !== user.email) {
      const existingByEmail = await this.usersRepository.findByEmail(
        updateUserDTO.email,
      );
      if (existingByEmail) {
        throw new HttpException(
          "Email already registered",
          HttpStatus.CONFLICT,
        );
      }
    }

    return this.usersRepository.update(id, updateUserDTO);
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    await this.findOneUser(id);
    await this.usersRepository.delete(id);
    return { message: "User deleted successfully" };
  }
}
