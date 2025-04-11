import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './core/db/data-source';
import { UsersModule } from './users/users.module';
import { GlobalModule } from './global.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PlacesModule } from './places/places.module';
import { SchedulesModule } from './schedules/schedules.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { GlobalBlockModule } from './global_block/global_block.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        name: 'default',
      },
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    PlacesModule,
    GlobalModule,
    AuthModule,
    SchedulesModule,
    GlobalBlockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
