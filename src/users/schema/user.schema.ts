import { EntitySchema } from 'typeorm';
import { User } from '../entity/users';
import { EUserType } from '../entity/euser-type';

export const UsersSchema = new EntitySchema<User>({
  name: 'users',
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    email: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    type: {
      type: 'enum',
      enum: EUserType,
      nullable: false,
    },
    active: {
      type: 'boolean',
      nullable: false,
    },
    created_at: {
      type: 'timestamp',
      nullable: false,
    },
  },
});
