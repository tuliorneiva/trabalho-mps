import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserFactory } from "./user.factory";
import { User } from "./entities/user.entity";
import { USERS_REPOSITORY } from "./strategies/users.repository.interface";
import { UsersTypeOrmRepository } from "./strategies/users-typeorm.strategy.ts";
import { UsersInMemoryRepository } from "./strategies/users-in-memory.strategy";

const useMemory = process.env.STORAGE_TYPE === "memory";

const repositoryProvider = useMemory
  ? { provide: USERS_REPOSITORY, useClass: UsersInMemoryRepository }
  : { provide: USERS_REPOSITORY, useClass: UsersTypeOrmRepository };

@Module({
  imports: useMemory ? [] : [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserFactory, repositoryProvider],
  exports: [UsersService],
})
export class UsersModule {}
