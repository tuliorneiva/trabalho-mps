import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import type { IUsersRepository } from './repositories/users.repository.interface';
import { USERS_REPOSITORY } from './repositories/users.repository.interface';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: IUsersRepository,
    ) {}

    async getAllUsers(limit?: number, offset?: number): Promise<User[]> {
        return this.usersRepository.findAll(limit, offset);
    }

    async findOneUser(id: string): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const existingByEmail = await this.usersRepository.findByEmail(createUserDTO.email);
        if (existingByEmail) {
            throw new HttpException('Email already registered', HttpStatus.CONFLICT);
        }

        const existingByLogin = await this.usersRepository.findByLogin(createUserDTO.login);
        if (existingByLogin) {
            throw new HttpException('Login already registered', HttpStatus.CONFLICT);
        }

        return this.usersRepository.create(createUserDTO);
    }

    async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
        const user = await this.findOneUser(id);

        if (updateUserDTO.email && updateUserDTO.email !== user.email) {
            const existingByEmail = await this.usersRepository.findByEmail(updateUserDTO.email);
            if (existingByEmail) {
                throw new HttpException('Email already registered', HttpStatus.CONFLICT);
            }
        }

        return this.usersRepository.update(id, updateUserDTO);
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        await this.findOneUser(id);
        await this.usersRepository.delete(id);
        return { message: 'User deleted successfully' };
    }
}
