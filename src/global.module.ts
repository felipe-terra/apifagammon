import { Global, Module, Provider } from '@nestjs/common';
import { UserRepository } from './users/repository/user.repository';
import { DataSource } from 'typeorm';
import { User } from './users/entity/users';
import { getDataSourceToken } from '@nestjs/typeorm';
import { PlaceRepository } from './places/repository/place.repository';
import { Place } from './places/entity/places';
import { ScheduleRepository } from './schedules/repository/schedules.repository';
import { Schedule } from './schedules/entity/schedules';

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
  {
    provide: ScheduleRepository,
    useFactory: (dataSource: DataSource) =>
      new ScheduleRepository(dataSource.getRepository(Schedule), dataSource),
    inject: [getDataSourceToken()],
  },
];

@Global()
@Module({
  providers: repositoryProviders,
  exports: repositoryProviders,
})
export class GlobalModule {}
