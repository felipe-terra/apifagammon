import { Entity } from 'src/core/repository/generic.repository';
import { Schedule } from './schedules';

export class ScheduleSubscription implements Entity {
  id: number;
  id_schedule: number;
  name: string;
  email: string;
  phone: string;
  subscribed_at: Date;
  schedule: Schedule;
  status: 'ACTIVE' | 'CANCELLED';

  constructor(partial: Partial<ScheduleSubscription>) {
    Object.assign(this, partial);
  }

  static newSubscription(data: {
    id_schedule: number;
    name: string;
    email: string;
    phone: string;
  }): ScheduleSubscription {
    const input: Partial<ScheduleSubscription> = {
      id_schedule: data.id_schedule,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subscribed_at: new Date(),
      status: 'ACTIVE',
    };
    return new ScheduleSubscription(input);
  }

  cancel() {
    this.status = 'CANCELLED';
  }

  toJSON() {
    return {
      id: this.id,
      id_schedule: this.id_schedule,
      name: this.name,
      email: this.email,
      phone: this.phone,
      subscribed_at: this.subscribed_at,
      status: this.status,
    };
  }
}