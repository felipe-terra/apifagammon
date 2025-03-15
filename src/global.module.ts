import { Global, Module } from '@nestjs/common';
import { UserRepository } from './users/repository/user.repository';
import { DataSource } from 'typeorm';
import { User } from './users/entity/users';
import { getDataSourceToken } from '@nestjs/typeorm';

@Global()
@Module({
  providers: [
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) =>
        new UserRepository(dataSource.getRepository(User)),
      inject: [getDataSourceToken()],
    },
  ],
  exports: [
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) =>
        new UserRepository(dataSource.getRepository(User)),
      inject: [getDataSourceToken()],
    },
  ],
})
export class GlobalModule {}
