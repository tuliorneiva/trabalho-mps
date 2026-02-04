import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getAllUsers(limit?: number, offset?: number): Promise<User[]> {
        const query = this.userRepository.createQueryBuilder('user');
        
        if (limit) {
            query.take(limit);
        }
        
        if (offset) {
            query.skip(offset);
        }
        
        return await query.getMany();
    }

    async findOneUser(id: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        
        return user;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const existingUserByEmail = await this.userRepository.findOne({
            where: { email: createUserDTO.email }
        });
        
        if (existingUserByEmail) {
            throw new HttpException('Email already registered', HttpStatus.CONFLICT);
        }

        const existingUserByLogin = await this.userRepository.findOne({
            where: { login: createUserDTO.login }
        });
        
        if (existingUserByLogin) {
            throw new HttpException('Login already registered', HttpStatus.CONFLICT);
        }
        
        const newUser = this.userRepository.create({
            ...createUserDTO,
            active: true,
        });
        
        return await this.userRepository.save(newUser);
    }

    async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
        const user = await this.findOneUser(id);
        
        if (updateUserDTO.email && updateUserDTO.email !== user.email) {
            const existingUser = await this.userRepository.findOne({
                where: { email: updateUserDTO.email }
            });
            
            if (existingUser) {
                throw new HttpException('Email already registered', HttpStatus.CONFLICT);
            }
        }
        
        Object.assign(user, updateUserDTO);
        return await this.userRepository.save(user);
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        const user = await this.findOneUser(id);
        
        await this.userRepository.remove(user);
        
        return { message: 'User deleted successfully' };
    }
}
