import { Injectable } from '@nestjs/common';
import { PlaceRepository } from './repository/place.repository';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entity/places';
import { EDayOfWeek } from 'src/place-configurations/entity/eday-of-week';
import { PlaceConfigurationRepository } from 'src/place-configurations/repository/place-configuration.repository';

@Injectable()
export class PlacesService {
  constructor(
    private placeRepository: PlaceRepository,
    private placeConfigurationsRepository: PlaceConfigurationRepository,
  ) {}

  async create(placeDto: CreatePlaceDto) {
    const place = Place.newPlace(placeDto);
    await this.placeRepository.create(place);
    return place.toJSON();
  }

  async findById(id: number) {
    const place = await this.placeRepository.findById(id);
    return place.toJSON();
  }

  async findAll() {
    return (await this.placeRepository.findAll()).map((place) =>
      place.toJSON(),
    );
  }

  async update(id: number, placeDto: CreatePlaceDto) {
    const place = Place.newPlaceWithId(id, placeDto);
    await this.placeRepository.update(place);
    return place.toJSON();
  }

  async delete(id: number) {
    await this.placeRepository.delete(id);
  }

  async getCombo() {
    return await this.placeRepository.getCombo();
  }

  async getComboConfigurations(id_place: number, day_of_week: EDayOfWeek) {
    return await this.placeConfigurationsRepository.getCombo(
      id_place,
      day_of_week,
    );
  }
}
