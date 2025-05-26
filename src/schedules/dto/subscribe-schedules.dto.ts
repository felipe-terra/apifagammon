import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubscribeSchedulesDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  id_schedule: number;

  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}