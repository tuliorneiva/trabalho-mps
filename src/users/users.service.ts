import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) {}

    async getAllUsers(limit?: number, offset?: number): Promise<User[]> {
        return this.usersRepository.findAll(limit, offset);
    }

    async findOneUser(id: string): Promise<User> {
        const user = this.usersRepository.findById(id);
        
        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }
        
        return user;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const existingUser = this.usersRepository.findByEmail(createUserDTO.email);
        
        if (existingUser) {
            throw new HttpException('Email já cadastrado', HttpStatus.CONFLICT);
        }
        
        const now = new Date();
        const newUser: User = {
            id: randomUUID(),
            name: createUserDTO.name,
            email: createUserDTO.email,
            active: true,
            createdAt: now,
            updatedAt: now,
        };
        
        return this.usersRepository.create(newUser);
    }

    async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
        const user = await this.findOneUser(id);
        
        if (updateUserDTO.email && updateUserDTO.email !== user.email) {
            const existingUser = this.usersRepository.findByEmail(updateUserDTO.email);
            
            if (existingUser) {
                throw new HttpException('Email já cadastrado', HttpStatus.CONFLICT);
            }
        }
        
        const updatedUser: User = {
            ...user,
            ...updateUserDTO,
            updatedAt: new Date(),
        };
        
        return this.usersRepository.update(id, updatedUser);
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        const user = await this.findOneUser(id);
        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }
        
        this.usersRepository.delete(id);
        
        return { message: 'Usuário deletado com sucesso' };
    }
}
