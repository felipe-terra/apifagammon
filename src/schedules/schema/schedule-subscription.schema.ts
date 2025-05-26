import { EntitySchema } from 'typeorm';
import { ScheduleSubscription } from '../entity/schedule-subscription';

export const ScheduleSubscriptionSchema = new EntitySchema<ScheduleSubscription>({
  name: 'ScheduleSubscription',
  tableName: 'schedule_subscriptions',
  target: ScheduleSubscription,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    id_schedule: {
      type: Number,
      nullable: false,
    },
    name: {
      type: String,
      length: 255,
      nullable: false,
    },
    email: {
      type: String,
      length: 255,
      nullable: false,
    },
    phone: {
      type: String,
      length: 20,
      nullable: false,
    },
    subscribed_at: {
      type: Date,
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    },
    status: {
      type: 'enum',
      enum: ['ACTIVE', 'CANCELLED'],
      default: 'ACTIVE',
    },
  },
  relations: {
    schedule: {
      type: 'many-to-one',
      target: 'Schedule',
      joinColumn: {
        name: 'id_schedule',
      },
    },
  },
  indices: [
    {
      name: 'IDX_SCHEDULE_SUBSCRIPTION_SCHEDULE',
      columns: ['id_schedule'],
    },
    {
      name: 'IDX_SCHEDULE_SUBSCRIPTION_EMAIL',
      columns: ['email'],
    },
  ],
});