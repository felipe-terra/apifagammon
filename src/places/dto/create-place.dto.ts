import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value;
  })
  configurations: CreatePlaceConfigurationDto[];

  @IsNotEmpty()
  @ApiProperty({
    example: 100,
  })
  people_capacity: number;

  photo: string;
}
