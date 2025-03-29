import { Entity } from 'src/core/repository/generic.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { EUserType } from './euser-type';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';

export class User implements Entity {
  id: number;
  name: string;
  email: string;
  password: string;
  type: EUserType;
  active: boolean;
  created_at: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  static newUser(data: CreateUserDto): User {
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

  static newUserWithId(id: number, data: UpdateUserDto): User {
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

  static getPermissions(userType: EUserType) {
    if (userType === EUserType.ADMIN) {
      return [
        {
          name: 'Home',
          screens: [
            {
              name: 'Home',
              path: './home.html',
              icon: 'ti ti-home',
            },
          ],
        },
        {
          name: 'Cadastros',
          screens: [
            {
              name: 'Ambientes',
              path: './ambientes.html',
              icon: 'ti ti-map-pins',
            },
            {
              name: 'Usuários',
              path: './usuarios.html',
              icon: 'ti ti-users',
            },
          ],
        },
        {
          name: 'Agendamentos',
          screens: [
            {
              name: 'Agendamento',
              path: './visualizar_agendamentos.html',
              icon: 'ti ti-map-pins',
            },
          ],
        },
      ];
    }
    return [
      {
        name: 'Home',
        screens: [
          {
            name: 'Home',
            path: './home.html',
            icon: 'ti ti-home',
          },
        ],
      },
      {
        name: 'Agendamentos',
        screens: [
          {
            name: 'Agendamento',
            path: './agendamento.html',
            icon: 'ti ti-map-pins',
          },
        ],
      },
    ];
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
