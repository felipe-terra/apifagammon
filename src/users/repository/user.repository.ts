import { GenericRepository } from 'src/core/repository/generic.repository';
import { User } from '../entity/users';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends GenericRepository<User> {
  entityName: string = 'User';

  constructor(public repository: Repository<User>) {
    super(repository);
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  async emailAlreadyExists(email: string, id?: number) {
    let sql = `SELECT COUNT(*) FROM users WHERE email = $1`;
    const params: any = [email];
    if (id) {
      sql += ` AND id != $2`;
      params.push(id);
    }
    const result = await this.repository.query(sql, params);
    return result[0].count > 0;
  }
}
