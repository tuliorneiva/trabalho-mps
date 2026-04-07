import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { IUsersRepository } from "./users.repository.interface";

@Injectable()
export class UsersTypeOrmRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findAll(limit?: number, offset?: number): Promise<User[]> {
    const query = this.repo.createQueryBuilder("user");
    if (limit) query.take(limit);
    if (offset) query.skip(offset);
    return await query.getMany();
  }

  async findById(id: string): Promise<User | undefined> {
    return (await this.repo.findOne({ where: { id } })) ?? undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return (await this.repo.findOne({ where: { email } })) ?? undefined;
  }

  async findByLogin(login: string): Promise<User | undefined> {
    return (await this.repo.findOne({ where: { login } })) ?? undefined;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repo.create({ active: true, ...userData });
    return await this.repo.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    Object.assign(user, userData);
    return await this.repo.save(user);
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      return false;
    }
    await this.repo.remove(user);
    return true;
  }
}
