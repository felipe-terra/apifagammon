import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategyService],
})
export class AuthModule {}
