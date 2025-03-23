import { EntitySchema } from 'typeorm';
import { Schedule } from '../entity/schedules';

export const SchedulesSchema = new EntitySchema<Schedule>({
  name: 'schedules',
  tableName: 'schedules',
  target: Schedule,
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    id_user_requested: {
      type: 'int',
      nullable: false,
    },
    id_place_configuration: {
      type: 'int',
      nullable: false,
    },
    date: {
      type: 'timestamp',
      nullable: false,
    },
    status: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    start: {
      type: 'varchar',
      length: 5,
      nullable: false,
    },
    end: {
      type: 'varchar',
      length: 5,
      nullable: false,
    },
    id_user_cancelled: {
      type: 'int',
      nullable: true,
    },
    date_cancelled: {
      type: 'timestamp',
      nullable: true,
    },
    created_at: {
      type: 'timestamp',
      nullable: false,
    },
    reason: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
  },
});
