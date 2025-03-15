import { Global, Module, Provider } from '@nestjs/common';
import { UserRepository } from './users/repository/user.repository';
import { DataSource } from 'typeorm';
import { User } from './users/entity/users';
import { getDataSourceToken } from '@nestjs/typeorm';
import { PlaceRepository } from './places/repository/place.repository';
import { Place } from './places/entity/places';

const repositoryProviders: Provider[] = [
  {
    provide: UserRepository,
    useFactory: (dataSource: DataSource) =>
      new UserRepository(dataSource.getRepository(User)),
    inject: [getDataSourceToken()],
  },
  {
    provide: PlaceRepository,
    useFactory: (dataSource: DataSource) =>
      new PlaceRepository(dataSource.getRepository(Place)),
    inject: [getDataSourceToken()],
  },
];

@Global()
@Module({
  providers: repositoryProviders,
  exports: repositoryProviders,
})
export class GlobalModule {}
