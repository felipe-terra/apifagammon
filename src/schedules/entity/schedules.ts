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

  static cancelSchedule(data: CreateSchedulesDto): Schedule {
    //Mudar a logica do cancelamento depois qdo for entregar pra ele.
    const input: Partial<Schedule> = {
      //id_user_cancelled: data.id_user_cancelled,
      date_cancelled: new Date(),
      status: EScheduleStatus.CANCELADO,
      reason: data.reason,
    };

    const schedule = new Schedule(input);
    return schedule;
  }

  toJSON() {
    return {
      id: this.id,
      id_user_requested: this.id_user_requested,
      id_place_configuration: this.id_place_configuration,
      date: this.date,
      status: this.status,
      reason: this.reason,
      //esses aqui estão como nulos pq só vão ser preenchidos se realmente houver cancelamento
      id_user_cancelled: this.id_user_cancelled ?? null,
      date_cancelled: this.date_cancelled ?? null,
    };
  }
}
