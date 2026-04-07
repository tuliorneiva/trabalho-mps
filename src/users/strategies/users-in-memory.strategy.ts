import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { User } from "../entities/user.entity";
import { IUsersRepository } from "./users.repository.interface";

@Injectable()
export class UsersInMemoryRepository implements IUsersRepository {
  private users: Map<string, User> = new Map();
  private emailIndex: Map<string, string> = new Map();
  private loginIndex: Map<string, string> = new Map();

  async findAll(limit?: number, offset?: number): Promise<User[]> {
    const allUsers = Array.from(this.users.values());
    const start = offset ?? 0;
    const end = limit !== undefined ? start + limit : undefined;
    return Promise.resolve(allUsers.slice(start, end));
  }

  async findById(id: string): Promise<User | undefined> {
    return Promise.resolve(this.users.get(id));
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userId = this.emailIndex.get(email);
    return Promise.resolve(userId ? this.users.get(userId) : undefined);
  }

  async findByLogin(login: string): Promise<User | undefined> {
    const userId = this.loginIndex.get(login);
    return Promise.resolve(userId ? this.users.get(userId) : undefined);
  }

  async create(userData: Partial<User>): Promise<User> {
    const now = new Date();
    const userInfo = {
      id: randomUUID(),
      active: true,
      createdAt: now,
      updatedAt: now,
      ...userData,
    };
    const user = Object.assign(new User(), userInfo);

    const customId = (user as unknown as { idUsuario?: string }).idUsuario;
    const userId = user.id || customId;
    if (userId) {
      this.users.set(userId, user);
    }

    if (user.email && userId) {
      this.emailIndex.set(user.email, userId);
    }

    const userLogin = (user as unknown as Record<string, string>).login;
    if (typeof userLogin === "string" && userId) {
      this.loginIndex.set(userLogin, userId);
    }

    return Promise.resolve(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const existing = this.users.get(id);
    if (!existing) {
      return Promise.reject(new Error("Usuário não encontrado"));
    }

    if (userData.email && userData.email !== existing.email) {
      if (existing.email) {
        this.emailIndex.delete(existing.email);
      }
      this.emailIndex.set(userData.email, id);
    }

    const updated = Object.assign(existing, userData, {
      updatedAt: new Date(),
    });
    this.users.set(id, updated);
    return Promise.resolve(updated);
  }

  async delete(id: string): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) {
      return Promise.resolve(false);
    }

    if (user.email) {
      this.emailIndex.delete(user.email);
    }

    const userLogin = (user as unknown as Record<string, string>).login;
    if (typeof userLogin === "string") {
      this.loginIndex.delete(userLogin);
    }

    return Promise.resolve(this.users.delete(id));
  }
}
