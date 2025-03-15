import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EUserType } from '../entity/euser-type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;
  @ApiProperty({
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @MaxLength(100)
  @IsEmail()
  @IsString()
  email: string;
  @ApiProperty({
    example: 'password123',
  })
  @IsOptional()
  @MaxLength(100)
  @MinLength(6)
  @IsString()
  password: string;
  @ApiProperty({
    example: EUserType.USER,
  })
  @IsNotEmpty()
  @MaxLength(10)
  @IsEnum(EUserType)
  type: EUserType;
  @ApiProperty({
    example: true,
  })
  @IsNotEmpty()
  active: boolean;
}
