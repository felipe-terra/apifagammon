import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-strategy/jwt.guard';
import { EDayOfWeek } from 'src/place-configurations/entity/eday-of-week';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
@ApiTags('Places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @UseInterceptors(FileInterceptor('photo'))
  @ApiBody({ type: CreatePlaceDto })
  @Post()
  async Create(
    @Body() createPlaceDto: CreatePlaceDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpeg|png|webp|pdf)$/,
        })
        .addMaxSizeValidator({
          maxSize: 100000000,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    photo?: Express.Multer.File,
  ) {
    return await this.placesService.create(createPlaceDto, photo);
  }

  @Get()
  async FindAll() {
    return await this.placesService.findAll();
  }

  @Get('combo/places')
  async getCombo() {
    return await this.placesService.getCombo();
  }

  @Get('combo/configurations/:id_place/:day_of_week')
  async getComboConfigurations(
    @Param('id_place') id_place: number,
    @Param('day_of_week') day_of_week: EDayOfWeek,
  ) {
    return await this.placesService.getComboConfigurations(id_place, day_of_week);
  }

  @Get(':id')
  async FindOne(@Param('id') id: number) {
    return await this.placesService.findById(+id);
  }

  @UseInterceptors(FileInterceptor('photo'))
  @ApiBody({ type: CreatePlaceDto })
  @Put(':id')
  async Update(
    @Param('id') id: number,
    @Body() updatePlaceDto: CreatePlaceDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpeg|png|webp|pdf)$/,
        })
        .addMaxSizeValidator({
          maxSize: 100000000,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    photo?: Express.Multer.File,
  ) {
    return this.placesService.update(+id, updatePlaceDto, photo);
  }

  @Delete(':id')
  async Remove(@Param('id') id: number) {
    return this.placesService.delete(+id);
  }
}
