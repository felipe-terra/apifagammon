import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class DefineNewPasswordDto {
  @ApiProperty({
    example: '1234567',
  })
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(6)
  @IsString()
  new_password: string;

  @ApiProperty({
    example: '1234567',
  })
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(6)
  @IsString()
  confirm_password: string;

  token: string;
}
