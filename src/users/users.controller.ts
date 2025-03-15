import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

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

  @Get(':id')
  async FindOne(@Param('id') id: number) {
    return await this.usersService.findById(+id);
  }

  @Put(':id')
  async Update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async Remove(@Param('id') id: number) {
    return this.usersService.delete(+id);
  }
}
