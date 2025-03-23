import { Entity } from 'src/core/repository/generic.repository';
import { CreateSchedulesDto } from '../dto/create-schedules.dto';
export class Schedule implements Entity {
  id: number;
  id_user_requested: number;
  id_place_configuration: number;
  date: Date;
  created_at: Date;
  status: string;
  start: string;
  end: string;
  id_user_cancelled: number;
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
      start: data.start,
      end: data.end,
      status: 'Aprovado',
    };
    const schedule = new Schedule(input);
    return schedule;
  }

  static cancelSchedule(data: CreateSchedulesDto): Schedule { //Mudar a logica do cancelamento depois qdo for entregar pra ele.
    const input: Partial<Schedule> = {
      id_user_cancelled: data.id_user_cancelled,
      date_cancelled: new Date(),
      status: 'Cancelado',
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
      start: this.start,
      end: this.end,
      //esses aqui estão como nulos pq só vão ser preenchidos se realmente houver cancelamento
      id_user_cancelled: this.id_user_cancelled ?? null,
      date_cancelled: this.date_cancelled ?? null,
    };
  }
}
