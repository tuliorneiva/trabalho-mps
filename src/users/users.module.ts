import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { USERS_REPOSITORY } from './repositories/users.repository.interface';
import { UsersTypeOrmRepository } from './repositories/users-typeorm.repository';
import { UsersInMemoryRepository } from './repositories/users-in-memory.repository';

const useMemory = process.env.STORAGE_TYPE === 'memory';

const repositoryProvider = useMemory
    ? { provide: USERS_REPOSITORY, useClass: UsersInMemoryRepository }
    : { provide: USERS_REPOSITORY, useClass: UsersTypeOrmRepository };

@Module({
    imports: useMemory ? [] : [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, repositoryProvider],
    exports: [UsersService],
})
export class UsersModule {}
