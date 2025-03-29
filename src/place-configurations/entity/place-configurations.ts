import { Entity } from 'src/core/repository/generic.repository';
import { EDayOfWeek } from './eday-of-week';
import { Place } from 'src/places/entity/places';
import { CreatePlaceConfigurationDto } from '../dto/create-place-configuration.dto';

export class PlaceConfiguration implements Entity {
  id: number;
  id_place: number;
  place: Place;
  day_of_week: EDayOfWeek;
  start_time: string;
  end_time: string;
  order: number;

  constructor(partial: Partial<PlaceConfiguration>) {
    Object.assign(this, partial);
  }

  static newPlaceConfiguration(data: CreatePlaceConfigurationDto, order: number): PlaceConfiguration {
    const input: Partial<PlaceConfiguration> = {
      day_of_week: data.day_of_week,
      start_time: data.start_time,
      end_time: data.end_time,
      order: order,
    };
    const placeConfiguration = new PlaceConfiguration(input);
    return placeConfiguration;
  }

  static newPlaceConfigurationWithId(
    id: number,
    data: CreatePlaceConfigurationDto,
    order: number,
  ): PlaceConfiguration {
    const input: Partial<PlaceConfiguration> = {
      id: id,
      day_of_week: data.day_of_week,
      start_time: data.start_time,
      end_time: data.end_time,
      order: order,
    };
    const placeConfiguration = new PlaceConfiguration(input);
    return placeConfiguration;
  }

  toJSON() {
    return {
      id: this.id,
      day_of_week: this.day_of_week,
      start_time: this.start_time.slice(0, 5),
      end_time: this.end_time.slice(0, 5),
      order: this.order,
      place: this.place?.toJSON(),
    };
  }

  toPublicJSON() {
    return {
      start_time: this.start_time.slice(0, 5),
      end_time: this.end_time.slice(0, 5),
      place: this.place?.toPublicJSON(),
    };
  }
}
