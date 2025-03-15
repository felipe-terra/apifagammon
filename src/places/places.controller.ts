import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-strategy/jwt.guard';

@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
@ApiTags('Places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  async Create(@Body() createPlaceDto: CreatePlaceDto) {
    return await this.placesService.create(createPlaceDto);
  }

  @Get()
  async FindAll() {
    return await this.placesService.findAll();
  }

  @Get(':id')
  async FindOne(@Param('id') id: number) {
    return await this.placesService.findById(+id);
  }

  @Put(':id')
  async Update(
    @Param('id') id: number,
    @Body() updatePlaceDto: CreatePlaceDto,
  ) {
    return this.placesService.update(+id, updatePlaceDto);
  }

  @Delete(':id')
  async Remove(@Param('id') id: number) {
    return this.placesService.delete(+id);
  }
}
