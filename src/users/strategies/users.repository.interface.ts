import { User } from "../entities/user.entity";

export const USERS_REPOSITORY = "USERS_REPOSITORY";

export interface IUsersRepository {
  findAll(limit?: number, offset?: number): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByLogin(login: string): Promise<User | undefined>;
  create(userData: Partial<User>): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User>;
  delete(id: string): Promise<boolean>;
}
