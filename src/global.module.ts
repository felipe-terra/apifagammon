import { Global, Module, Provider } from '@nestjs/common';
import { UserRepository } from './users/repository/user.repository';
import { DataSource } from 'typeorm';
import { User } from './users/entity/users';
import { getDataSourceToken } from '@nestjs/typeorm';
import { PlaceRepository } from './places/repository/place.repository';
import { Place } from './places/entity/places';
import { ScheduleRepository } from './schedules/repository/schedules.repository';
import { Schedule } from './schedules/entity/schedules';
import { PlaceConfigurationRepository } from './place-configurations/repository/place-configuration.repository';
import { PlaceConfiguration } from './place-configurations/entity/place-configurations';
import { EmailSenderService } from './core/communication/email/email-sender.service';
import { GlobalBlockRepository } from './global_block/repository/global_block.repository';
import { GlobalBlock } from './global_block/entity/global_block';
import { FileManager } from './core/file-manager/file-manager';
import { ScheduleSubscriptionRepository } from './schedules/repository/schedule-subscription.repository';
import { ScheduleSubscription } from './schedules/entity/schedule-subscription';

const repositoryProviders: Provider[] = [
  {
    provide: UserRepository,
    useFactory: (dataSource: DataSource) => new UserRepository(dataSource.getRepository(User)),
    inject: [getDataSourceToken()],
  },
  {
    provide: PlaceRepository,
    useFactory: (dataSource: DataSource) => new PlaceRepository(dataSource.getRepository(Place)),
    inject: [getDataSourceToken()],
  },
  {
    provide: ScheduleRepository,
    useFactory: (dataSource: DataSource) => new ScheduleRepository(dataSource.getRepository(Schedule)),
    inject: [getDataSourceToken()],
  },
  {
    provide: ScheduleSubscriptionRepository,
    useFactory: (dataSource: DataSource) =>
      new ScheduleSubscriptionRepository(dataSource.getRepository(ScheduleSubscription)),
    inject: [getDataSourceToken()],
  },
  {
    provide: PlaceConfigurationRepository,
    useFactory: (dataSource: DataSource) =>
      new PlaceConfigurationRepository(dataSource.getRepository(PlaceConfiguration)),
    inject: [getDataSourceToken()],
  },
  {
    provide: EmailSenderService,
    useClass: EmailSenderService,
  },
  {
    provide: FileManager,
    useClass: FileManager,
  },
  {
    provide: GlobalBlockRepository,
    useFactory: (dataSource: DataSource) => new GlobalBlockRepository(dataSource.getRepository(GlobalBlock)),
    inject: [getDataSourceToken()],
  },
];

@Global()
@Module({
  providers: repositoryProviders,
  exports: repositoryProviders,
})
export class GlobalModule {}
