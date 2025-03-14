import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // quando for subir pra prod, trocar isso e colocar um .env
    });
  }

  async validate(payload: any) {
    return { 
      id: payload.sub, 
      login: payload.username,
      role: payload.role 
    };
  }
}