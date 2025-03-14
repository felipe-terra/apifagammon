import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LaboratoriesModule } from './laboratories/laboratories.module';
import { ReservationsModule } from './reservations/reservations.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'database.sqlite'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // QUANDO MUDAR PRA PROD DEIXA COMO FALSE POR FAVOR :D
    }),
    AuthModule, 
    UsersModule, 
    LaboratoriesModule, 
    ReservationsModule, 
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
