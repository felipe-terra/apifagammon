import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(6)
  @IsString()
  current_password: string;

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

  user_id: number;
}
