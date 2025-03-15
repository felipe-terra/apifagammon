import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty({
    example: 'Studio X',
  })
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;

  @ApiProperty({
    example: true,
  })
  @IsNotEmpty()
  active: boolean;
}
