import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CancelSchedulesDto {
  id_user_cancelled: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Team meeting',
    description: 'Reason for the schedule',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
