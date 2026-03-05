import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from '../entities/user.entity';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class UsersInMemoryRepository implements IUsersRepository {
    private users: Map<string, User> = new Map();
    private emailIndex: Map<string, string> = new Map();
    private loginIndex: Map<string, string> = new Map();

    async findAll(limit?: number, offset?: number): Promise<User[]> {
        const allUsers = Array.from(this.users.values());
        const start = offset ?? 0;
        const end = limit !== undefined ? start + limit : undefined;
        return allUsers.slice(start, end);
    }

    async findById(id: string): Promise<User | undefined> {
        return this.users.get(id);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const userId = this.emailIndex.get(email);
        return userId ? this.users.get(userId) : undefined;
    }

    async findByLogin(login: string): Promise<User | undefined> {
        const userId = this.loginIndex.get(login);
        return userId ? this.users.get(userId) : undefined;
    }

    async create(userData: Partial<User>): Promise<User> {
        const now = new Date();
        const user = Object.assign(new User(), {
            id: randomUUID(),
            active: true,
            createdAt: now,
            updatedAt: now,
            ...userData,
        });

        this.users.set(user.id, user);
        this.emailIndex.set(user.email, user.id);
        this.loginIndex.set(user.login, user.id);

        return user;
    }

    async update(id: string, userData: Partial<User>): Promise<User> {
        const existing = this.users.get(id);
        if (!existing) {
            throw new Error('Usuário não encontrado');
        }

        if (userData.email && userData.email !== existing.email) {
            this.emailIndex.delete(existing.email);
            this.emailIndex.set(userData.email, id);
        }

        const updated = Object.assign(existing, userData, { updatedAt: new Date() });
        this.users.set(id, updated);
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const user = this.users.get(id);
        if (!user) {
            return false;
        }

        this.emailIndex.delete(user.email);
        this.loginIndex.delete(user.login);
        return this.users.delete(id);
    }
}
