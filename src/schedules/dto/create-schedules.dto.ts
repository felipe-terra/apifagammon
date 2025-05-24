import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSchedulesDto {
  id_user_requested: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  id_place_configuration: number;

  @ApiProperty({
    example: '2023-12-01',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Team meeting',
    description: 'Reason for the schedule',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({
    example: 'false',
    description: 'Is the schedule public?',
  })
  @IsNotEmpty()
  @IsBoolean()
  is_public: boolean;
}
