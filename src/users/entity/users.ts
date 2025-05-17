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
  validate_token: string;
  validate_token_expiration: Date;
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
    const input: Partial<User> = {
      id: id,
      name: data.name,
      email: data.email,
      type: data.type,
      active: data.active,
    };
    const user = new User(input);
    return user;
  }

  getPermissions(userType: EUserType) {
    if (userType === EUserType.ADMIN) {
      return {
        user_name: this.name,
        permissions: [
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
        ],
      };
    }
    return {
      user_name: this.name,
      permissions: [
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
      ],
    };
  }

  updatePassword(
    current_password: string,
    new_password: string,
    confirm_password: string,
  ): { success: boolean; message: string } {
    if (!bcrypt.compareSync(current_password, this.password)) {
      return {
        success: false,
        message: 'Senha atual inválida',
      };
    }
    if (new_password !== confirm_password) {
      return {
        success: false,
        message: 'As senhas não conferem',
      };
    }
    this.password = bcrypt.hashSync(new_password, 8);

    return {
      success: true,
      message: 'Senha atualizada com sucesso',
    };
  }

  forgotPassword() {
    this.validate_token = this.generateToken();
    this.validate_token_expiration = new Date(Date.now() + 60 * 60 * 1000);
  }

  defineNewPassword(new_password: string, confirm_password: string): { success: boolean; message: string } {
    if (new_password !== confirm_password) {
      return {
        success: false,
        message: 'As senhas não conferem',
      };
    }

    if (this.validate_token_expiration < new Date()) {
      return {
        success: false,
        message: 'Token expirado',
      };
    }

    this.password = bcrypt.hashSync(new_password, 8);
    this.validate_token = null;
    this.validate_token_expiration = null;

    return {
      success: true,
      message: 'Senha atualizada com sucesso',
    };
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

  toPublicJSON() {
    return {
      name: this.name,
    };
  }

  private generateToken(resultLength: number = 100): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < resultLength; i++) {
      const index = Math.floor(Math.random() * characters.length);
      result += characters[index];
    }
    return result;
  }
}
