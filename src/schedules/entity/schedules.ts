import { Entity } from 'src/core/repository/generic.repository';
import { CreateSchedulesDto } from '../dto/create-schedules.dto';
import { EScheduleStatus } from './eschedule-status';
import { User } from 'src/users/entity/users';
import { PlaceConfiguration } from 'src/place-configurations/entity/place-configurations';
export class Schedule implements Entity {
  id: number;
  id_user_requested: number;
  user_requested: User;
  id_place_configuration: number;
  place_configuration: PlaceConfiguration;
  date: Date;
  created_at: Date;
  status: EScheduleStatus;
  id_user_cancelled: number;
  user_cancelled: User;
  date_cancelled: Date;
  reason: string;

  constructor(partial: Partial<Schedule>) {
    Object.assign(this, partial);
  }

  static newSchedule(data: CreateSchedulesDto): Schedule {
    const input: Partial<Schedule> = {
      id_user_requested: data.id_user_requested,
      id_place_configuration: data.id_place_configuration,
      date: data.date,
      created_at: new Date(),
      status: EScheduleStatus.AGENDADO,
      reason: data.reason,
    };
    const schedule = new Schedule(input);
    return schedule;
  }

  cancel(id_user_cancelled: number) {
    this.status = EScheduleStatus.CANCELADO;
    this.date_cancelled = new Date();
    this.id_user_cancelled = id_user_cancelled;
  }

  toJSON() {
    return {
      id: this.id,
      date: this.date,
      status: this.status,
      reason: this.reason,
      place_configuration: this.place_configuration?.toJSON(),
    };
  }

  toAdminJSON() {
    return {
      id: this.id,
      date: this.date,
      status: this.status,
      reason: this.reason,
      place_configuration: this.place_configuration?.toJSON(),
      user_requested: this.user_requested?.toJSON(),
    };
  }

  toPublicJSON() {
    return {
      date: this.date,
      reason: this.reason,
      place_configuration: this.place_configuration?.toPublicJSON(),
      user_requested: this.user_requested?.toPublicJSON(),
    };
  }
}
