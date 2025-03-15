import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-strategy/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { EUserType } from './entity/euser-type';

@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async Create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async FindAll() {
    return await this.usersService.findAll();
  }

  @Get('permissions')
  async GetPermissions(@Req() req) {
    return this.usersService.getPermissions(EUserType[req.user.type]);
  }

  @Get(':id')
  async FindOne(@Param('id') id: number) {
    return await this.usersService.findById(+id);
  }

  @Put(':id')
  async Update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async Remove(@Param('id') id: number) {
    return this.usersService.delete(+id);
  }
}
