import { GenericRepository } from 'src/core/repository/generic.repository';
import { Repository } from 'typeorm';
import { Schedule } from '../entity/schedules';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ScheduleRepository extends GenericRepository<Schedule> {
  entityName: string = 'Schedule';
  constructor(
    public repository: Repository<Schedule>,
    private dataSource: DataSource
  ) {
    super(repository);
  }


  //TODO: Criar uma função pra verificar se o ambiente está disponível no horário escolhido.


  async findAllWithDetails() {
    // Função pra mostrar todos os agendamentos pro frontend.
    const schedulesWithDetails = await this.dataSource.query(`
      SELECT 
        s.id, s.id_user_requested, s.id_place_configuration, s.date, s.created_at, s.status, s.id_user_cancelled, s.date_cancelled, s.start, s.end, s.reason,
        pc.id as config_id, pc.id_place, pc.day_of_week, pc.start_time, pc.end_time, pc.order, pc.active as config_active,
        p.id as place_id, p.name as place_name, p.active as place_active
      FROM 
        schedules s
      JOIN 
        place_configurations pc ON s.id_place_configuration = pc.id
      JOIN 
        places p ON pc.id_place = p.id
    `);
    
    return schedulesWithDetails.map(item => ({
      id: item.id,
      id_user_requested: item.id_user_requested,
      date: item.date,
      status: item.status,
      start: item.start,
      end: item.end,
      reason: item.reason,
      id_user_cancelled: item.id_user_cancelled,
      date_cancelled: item.date_cancelled,
      created_at: item.created_at,
      place: {
        id: item.place_id,
        name: item.place_name,
        active: item.place_active
      },
      placeConfiguration: {
        id: item.config_id,
        id_place: item.id_place,
        day_of_week: item.day_of_week,
        start_time: item.start_time,
        end_time: item.end_time,
        order: item.order,
        active: item.config_active
      }
    }));
  }
}
