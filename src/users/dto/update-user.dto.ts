import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { EUserType } from '../entity/euser-type';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
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
