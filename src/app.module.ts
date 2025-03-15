import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './core/db/data-source';
import { UsersModule } from './users/users.module';
import { GlobalModule } from './global.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
