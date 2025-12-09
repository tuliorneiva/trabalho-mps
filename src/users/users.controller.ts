import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { GetUserQueryDTO } from './dto/get-user-query.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    async getAllUsers(
        @Query() query: GetUserQueryDTO
    ): Promise<User[]> {
        return this.usersService.getAllUsers(query.limit, query.offset);
    }

    @Get(':id')
    async getUserById(
        @Param('id') id: string
    ): Promise<User> {
        return this.usersService.findOneUser(id);
    }

    @Post()
    async createUser(
        @Body() createUserDTO: CreateUserDTO
    ): Promise<User> {
        return this.usersService.createUser(createUserDTO);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDTO: UpdateUserDTO
    ): Promise<User> {
        return this.usersService.updateUser(id, updateUserDTO);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id: string
    ): Promise<{ message: string }> {
        return this.usersService.deleteUser(id);
    }
}

