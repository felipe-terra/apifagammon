import { Entity } from 'src/core/repository/generic.repository';
import { PlaceConfiguration } from 'src/place-configurations/entity/place-configurations';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { CreatePlaceConfigurationDto } from 'src/place-configurations/dto/create-place-configuration.dto';
import { HttpException } from '@nestjs/common';

export class Place implements Entity {
  id: number;
  name: string;
  active: boolean;
  place_configurations: PlaceConfiguration[];

  constructor(partial: Partial<Place>) {
    Object.assign(this, partial);
  }

  static newPlace(data: CreatePlaceDto): Place {
    this.validatePlaceConfigurations(data.configurations);

    const input: Partial<Place> = {
      name: data.name,
      active: data.active,
      place_configurations: this.createPlaceConfigurationsEntity(data.configurations),
    };

    const place = new Place(input);
    return place;
  }

  static newPlaceWithId(id: number, data: CreatePlaceDto): Place {
    this.validatePlaceConfigurations(data.configurations);

    const input: Partial<Place> = {
      id: id,
      name: data.name,
      active: data.active,
      place_configurations: this.createPlaceConfigurationsEntity(data.configurations),
    };
    const place = new Place(input);
    return place;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      active: this.active,
      configurations: this.place_configurations?.map((configuration) => configuration.toJSON()) ?? [],
    };
  }

  toPublicJSON() {
    return {
      name: this.name,
    };
  }

  private static createPlaceConfigurationsEntity(configurations: CreatePlaceConfigurationDto[]) {
    const placeConfigurations: PlaceConfiguration[] = [];
    const groupedConfigurations = this.groupPlaceConfiguratios(configurations);
    for (const dayOfWeek in groupedConfigurations) {
      const configurations = groupedConfigurations[dayOfWeek];
      const orderedConfigurations = this.orderByStartTime(configurations);
      orderedConfigurations.map((configuration, index) => {
        let placeConfiguration = null;
        if (configuration.id) {
          placeConfiguration = PlaceConfiguration.newPlaceConfigurationWithId(
            configuration.id,
            configuration,
            index + 1,
          );
        } else {
          placeConfiguration = PlaceConfiguration.newPlaceConfiguration(configuration, index + 1);
        }
        placeConfigurations.push(placeConfiguration);
      });
    }

    return placeConfigurations;
  }

  private static groupPlaceConfiguratios(configurations: CreatePlaceConfigurationDto[]) {
    return configurations.reduce((acc, configuration) => {
      const dayOfWeek = configuration.day_of_week;
      if (!acc[dayOfWeek]) {
        acc[dayOfWeek] = [];
      }
      acc[dayOfWeek].push(configuration);
      return acc;
    }, {});
  }

  private static orderByStartTime(configurations: CreatePlaceConfigurationDto[]) {
    return configurations.sort((a, b) => {
      const startTimeA = a.start_time;
      const startTimeB = b.start_time;
      return startTimeA.localeCompare(startTimeB);
    });
  }

  private static validatePlaceConfigurations(configurations: CreatePlaceConfigurationDto[]) {
    const groupedConfigurations = this.groupPlaceConfiguratios(configurations);
    for (const dayOfWeek of Object.keys(groupedConfigurations)) {
      const configurations = groupedConfigurations[dayOfWeek];
      const orderedConfigurations = this.orderByStartTime(configurations);
      for (let i = 0; i < orderedConfigurations.length - 1; i++) {
        const current = orderedConfigurations[i];
        const next = orderedConfigurations[i + 1];
        if (current.end_time > next.start_time) {
          throw new HttpException(`Conflict in configurations for day of week ${dayOfWeek}`, 400);
        }
      }
    }
  }
}
