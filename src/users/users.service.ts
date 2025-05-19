import { HttpException, Injectable } from '@nestjs/common';
import { User } from './entity/users';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { EUserType } from './entity/euser-type';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { EmailSenderService } from 'src/core/communication/email/email-sender.service';
import { getForgotPasswordTemplate } from 'src/core/communication/email/templates/forgot-password';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { DefineNewPasswordDto } from './dto/define-new-password.dto';
import { parse } from 'csv-parse/sync';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailSenderService: EmailSenderService,
  ) {}

  async create(userDto: CreateUserDto) {
    if (await this.userRepository.emailAlreadyExists(userDto.email)) {
      throw new HttpException('Email already exists', 400);
    }
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

  async update(id: number, userDto: UpdateUserDto) {
    if (await this.userRepository.emailAlreadyExists(userDto.email, id)) {
      throw new HttpException('Email already exists', 400);
    }
    const user = User.newUserWithId(id, userDto);
    await this.userRepository.update(user);
    return user.toJSON();
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findById(updatePasswordDto.user_id);
    const response = user.updatePassword(
      updatePasswordDto.current_password,
      updatePasswordDto.new_password,
      updatePasswordDto.confirm_password,
    );
    if (!response.success) {
      throw new HttpException(response.message, 400);
    }

    await this.userRepository.update(user);
  }

  async delete(id: number) {
    await this.userRepository.delete(id);
  }

  async getPermissions(userType: EUserType, userId: number) {
    const user = await this.userRepository.findById(userId);
    return user.getPermissions(userType);
  }

  async forgotPassword(props: forgotPasswordDto) {
    const user = await this.userRepository.findByEmail(props.email);
    if (!user) return;

    user.forgotPassword();
    await this.userRepository.update(user);

    await this.emailSenderService.sendMail({
      to: user.email,
      subject: 'Recuperação de senha',
      text: 'Recuperação de senha',
      body: getForgotPasswordTemplate(user.validate_token),
    });
  }

  async defineNewPassword(props: DefineNewPasswordDto) {
    const user = await this.userRepository.findByToken(props.token);
    if (!user) return;

    const response = user.defineNewPassword(props.new_password, props.confirm_password);
    if (!response.success) {
      throw new HttpException(response.message, 400);
    }

    await this.userRepository.update(user);
  }

  async importFromCsv(buffer: Buffer): Promise<any> {
    const content = buffer.toString('utf-8').replace(/;/g, ',');

    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
    const processed = [];
    for (const record of records) {
      try {
        const name = record['nome'];
        const email = record['email'];
        if (!name || !email) {
          processed.push({
            name: name || '',
            email: email || '',
            success: false,
            message: 'Nome e email são obrigatórios',
          });
          continue;
        }
        if (!email.includes('@')) {
          processed.push({
            name,
            email,
            success: false,
            message: 'Email inválido',
          });
          continue;
        }
        const userDto: CreateUserDto = {
          name,
          email,
          password: '123456',
          type: EUserType.USER,
          active: true,
        };
        try {
          const createdUser = await this.create(userDto);
          processed.push({
            name: createdUser.name,
            email: createdUser.email,
            success: true,
          });
        } catch (error) {
          processed.push({
            name,
            email,
            success: false,
            message: error.message,
          });
        }
      } catch (error) {
        processed.push({
          name: record['nome'] || '',
          email: record['email'] || '',
          success: false,
          message: error.message,
        });
      }
    }
    const successCount = processed.filter((p) => p.success).length;
    return {
      message: `${successCount} usuários registrados com sucesso.`,
    };
  }
}
