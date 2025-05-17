import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class forgotPasswordDto {
  @ApiProperty({
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @MaxLength(100)
  @IsEmail()
  @IsString()
  email: string;
}
