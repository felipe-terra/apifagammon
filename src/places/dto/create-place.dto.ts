import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
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
  configurations: CreatePlaceConfigurationDto[];
}
