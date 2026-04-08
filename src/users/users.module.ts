import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserFactory } from './user.factory';
import { USERS_REPOSITORY } from './strategies/users.repository.interface';
import { RepositoryFactory } from '../common/factories/repository.factory';
import { RepositoriesModule } from '../common/factories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserFactory,
    {
      provide: USERS_REPOSITORY,
      useFactory: (factory: RepositoryFactory) =>
        factory.createUsersRepository(),
      inject: [RepositoryFactory],
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
