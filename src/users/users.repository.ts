import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
    // Map para armazenar usuários por ID
    private users: Map<string, User> = new Map();
    
    // Map para indexar emails -> IDs (para validação de email único)
    private emailIndex: Map<string, string> = new Map();

    findAll(limit?: number, offset?: number): User[] {
        const allUsers = Array.from(this.users.values());
        
        if (offset !== undefined) {
            const start = offset;
            const end = limit !== undefined ? start + limit : undefined;
            return allUsers.slice(start, end);
        }
        
        if (limit !== undefined) {
            return allUsers.slice(0, limit);
        }
        
        return allUsers;
    }

    findById(id: string): User | undefined {
        return this.users.get(id);
    }

    findByEmail(email: string): User | undefined {
        const userId = this.emailIndex.get(email);
        if (!userId) {
            return undefined;
        }
        return this.users.get(userId);
    }

    create(user: User): User {
        this.users.set(user.id, user);
        this.emailIndex.set(user.email, user.id);
        return user;
    }

    update(id: string, user: User): User {
        const existingUser = this.users.get(id);
        if (!existingUser) {
            throw new Error('Usuário não encontrado');
        }

        // Se o email mudou, atualizar o índice
        if (existingUser.email !== user.email) {
            this.emailIndex.delete(existingUser.email);
            this.emailIndex.set(user.email, id);
        }

        this.users.set(id, user);
        return user;
    }

    delete(id: string): boolean {
        const user = this.users.get(id);
        if (!user) {
            return false;
        }

        this.emailIndex.delete(user.email);
        return this.users.delete(id);
    }

    count(): number {
        return this.users.size;
    }
}

