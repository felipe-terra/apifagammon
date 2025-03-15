import { GenericRepository } from 'src/core/repository/generic.repository';
import { User } from '../entity/users';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends GenericRepository<User> {
  constructor(public repository: Repository<User>) {
    super(repository);
  }
}
