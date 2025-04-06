import { EntitySchema } from 'typeorm';
import { Schedule } from '../entity/schedules';
import { EScheduleStatus } from '../entity/eschedule-status';

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
      type: 'date',
      nullable: false,
    },
    status: {
      type: 'enum',
      enum: EScheduleStatus,
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
      nullable: false,
    },
    cancelled_reason: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
  },
  relations: {
    user_requested: {
      target: 'users',
      type: 'many-to-one',
      joinColumn: { name: 'id_user_requested' },
    },
    user_cancelled: {
      target: 'users',
      type: 'many-to-one',
      joinColumn: { name: 'id_user_cancelled' },
    },
    place_configuration: {
      target: 'place_configurations',
      type: 'many-to-one',
      joinColumn: { name: 'id_place_configuration' },
    },
  },
});
