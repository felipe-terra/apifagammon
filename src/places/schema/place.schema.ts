import { EntitySchema } from 'typeorm';
import { Place } from '../entity/places';

export const PlaceSchema = new EntitySchema<Place>({
  name: 'places',
  tableName: 'places',
  target: Place,
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    active: {
      type: 'boolean',
      nullable: false,
    },
  },
  relations: {
    place_configurations: {
      type: 'one-to-many',
      target: 'place_configurations',
      inverseSide: 'place',
      cascade: ['insert', 'update', 'remove'],
    },
  },
});
