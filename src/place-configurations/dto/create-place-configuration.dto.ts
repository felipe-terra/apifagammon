import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { EDayOfWeek } from '../entity/eday-of-week';
import { IsTimeFormat } from 'src/core/validators/is-time-format';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceConfigurationDto {
  @IsNotEmpty()
  @IsEnum(EDayOfWeek)
  @ApiProperty({
    example: EDayOfWeek.SEGUNDA,
  })
  day_of_week: EDayOfWeek;
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  @IsTimeFormat()
  @ApiProperty({
    example: '08:00',
  })
  start_time: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  @IsTimeFormat()
  @ApiProperty({
    example: '08:00',
  })
  end_time: string;
  @IsNotEmpty()
  @ApiProperty({
    example: true,
  })
  active: boolean;
}
