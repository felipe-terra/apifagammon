import { Injectable } from '@nestjs/common';
import { PlaceRepository } from './repository/place.repository';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entity/places';

@Injectable()
export class PlacesService {
  constructor(private placeRepository: PlaceRepository) {}

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
}
