import { Injectable } from '@nestjs/common';
import { User } from './entity/users';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(userDto: CreateUserDto) {
    const user = User.newUser(userDto);
    await this.userRepository.create(user);
    return user.toJSON();
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);
    return user.toJSON();
  }

  async findAll() {
    return (await this.userRepository.findAll()).map((user) => user.toJSON());
  }

  async update(id: number, userDto: CreateUserDto) {
    const user = User.newUserWithId(id, userDto);
    await this.userRepository.update(user);
    return user.toJSON();
  }

  async delete(id: number) {
    await this.userRepository.softDelete(id);
  }
}
