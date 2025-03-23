import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsOptional } from "class-validator";
import { IsNumber } from "class-validator";
import { IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateSchedulesDto {
  @ApiProperty({ example: 1, description: 'ID of the user requesting the schedule' })
  @IsNotEmpty()
  @IsNumber()
  id_user_requested: number;

  @ApiProperty({ example: 1, description: 'ID of the place configuration' })
  @IsNotEmpty()
  @IsNumber()
  id_place_configuration: number;
  
  @ApiProperty({ example: '2023-12-01T10:00:00.000Z', description: 'Date of the schedule' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  @ApiProperty({ example: 'Aprovado', description: 'Status of the schedule', enum: ['Aprovado', 'Cancelado', 'Pendente'] })
  @IsString()
  status: string;

  @IsNotEmpty()
  @ApiProperty({ example: '10:00', description: 'Start time of the schedule' })
  @IsString()
  start: string;

  @IsNotEmpty()
  @ApiProperty({ example: '11:00', description: 'End time of the schedule' })
  @IsString()
  end: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Team meeting', description: 'Reason for the schedule' })
  @IsString()
  reason: string;

  @ApiProperty({ example: null, description: 'ID of the user who cancelled the schedule (if applicable)', required: false, nullable: true })
  @IsNumber()
  @IsOptional()
  id_user_cancelled?: number;

  @ApiProperty({ example: null, description: 'Date when the schedule was cancelled (if applicable)', required: false, nullable: true })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date_cancelled?: Date;
} 
