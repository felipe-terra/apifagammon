import { Entity } from 'src/core/repository/generic.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { EUserType } from './euser-type';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';

export class User implements Entity {
  id: number;
  name: string;
  email: string;
  password: string;
  type: EUserType;
  active: boolean;
  created_at: Date;
  deleted_at: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  static newUser(data: CreateUserDto): User {
    if (!data.password) {
      throw new HttpException('Password is required', 400);
    }

    const input: Partial<User> = {
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(data.password, 8),
      type: data.type,
      active: data.active,
      created_at: new Date(),
    };

    const user = new User(input);
    return user;
  }

  static newUserWithId(id: number, data: CreateUserDto): User {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 8);
    }
    const input: Partial<User> = {
      id: id,
      name: data.name,
      email: data.email,
      password: data.password,
      type: data.type,
      active: data.active,
    };
    const user = new User(input);
    return user;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      type: this.type,
      active: this.active,
    };
  }
}
