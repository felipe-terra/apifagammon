import { Entity } from 'src/core/repository/generic.repository';

export class Place implements Entity {
  id: number;
  name: string;
  active: boolean;

  constructor(partial: Partial<Place>) {
    Object.assign(this, partial);
  }

  static newPlace(data: any): Place {
    const input: Partial<Place> = {
      name: data.name,
      active: data.active,
    };

    const place = new Place(input);
    return place;
  }

  static newPlaceWithId(id: number, data: any): Place {
    const input: Partial<Place> = {
      id: id,
      name: data.name,
      active: data.active,
    };
    const place = new Place(input);
    return place;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      active: this.active,
    };
  }
}
