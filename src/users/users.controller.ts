import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-strategy/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { EUserType } from './entity/euser-type';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { DefineNewPasswordDto } from './dto/define-new-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Post()
  async Create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get()
  async FindAll() {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get('permissions')
  async GetPermissions(@Req() req) {
    return await this.usersService.getPermissions(EUserType[req.user.type], req.user.sub);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get(':id')
  async FindOne(@Param('id') id: number) {
    return await this.usersService.findById(+id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Put(':id')
  async Update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Patch('update-password')
  async UpdatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Req() req) {
    updatePasswordDto.user_id = req.user.sub;
    return this.usersService.updatePassword(updatePasswordDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Delete(':id')
  async Remove(@Param('id') id: number) {
    return this.usersService.delete(+id);
  }

  @Post('forgot-password')
  async ForgotPassword(@Body() props: forgotPasswordDto) {
    return this.usersService.forgotPassword(props);
  }

  @Patch('define-new-password/:token')
  async DefineNewPassword(@Param('token') token: string, @Body() props: DefineNewPasswordDto) {
    props.token = token;
    return this.usersService.defineNewPassword(props);
  }
}
