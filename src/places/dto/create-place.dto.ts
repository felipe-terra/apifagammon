import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CreatePlaceConfigurationDto } from 'src/place-configurations/dto/create-place-configuration.dto';

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

  @ApiProperty({
    type: [CreatePlaceConfigurationDto],
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePlaceConfigurationDto)
  configurations: CreatePlaceConfigurationDto[];

  @IsNotEmpty()
  @ApiProperty({
    example: 100,
  })
  people_capacity: number;

  photo: string;
}
