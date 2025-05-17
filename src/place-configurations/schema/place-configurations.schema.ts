import { EntitySchema } from 'typeorm';
import { PlaceConfiguration } from '../entity/place-configurations';
import { EDayOfWeek } from '../entity/eday-of-week';

export const PlaceConfigurationsSchema = new EntitySchema<PlaceConfiguration>({
  name: 'place_configurations',
  tableName: 'place_configurations',
  target: PlaceConfiguration,
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    id_place: {
      type: 'int',
      nullable: false,
    },
    day_of_week: {
      type: 'enum',
      enum: EDayOfWeek,
      nullable: false,
    },
    start_time: {
      type: 'time',
      nullable: false,
    },
    end_time: {
      type: 'time',
      nullable: false,
    },
    order: {
      type: 'int',
      nullable: false,
    },
  },
  relations: {
    place: {
      type: 'many-to-one',
      target: 'places',
      inverseSide: 'place_configurations',
      joinColumn: {
        name: 'id_place',
      },
      cascade: ['insert', 'update'],
      orphanedRowAction: 'delete',
      onDelete: 'CASCADE',
    },
  },
});
