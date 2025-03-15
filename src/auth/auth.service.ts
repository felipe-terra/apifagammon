import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new HttpException('Invalid username or password', 404);

    if (!user.active)
      throw new HttpException('Invalid username or password', 404);

    if (!bcrypt.compareSync(password, user.password))
      throw new HttpException('Invalid username or password', 404);

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
    };

    const jwt = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });

    return {
      token: jwt,
    };
  }
}
