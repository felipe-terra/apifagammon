import { Injectable } from '@nestjs/common';
import { User } from './entity/users';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(userDto: CreateUserDto) {
    const user = User.newUser(userDto);
    return await this.userRepository.create(user);
  }

  async findById(id: number) {
    return await this.userRepository.findById(id);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async update(id: number, userDto: CreateUserDto) {
    const user = User.newUserWithId(id, userDto);
    return await this.userRepository.update(user);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
