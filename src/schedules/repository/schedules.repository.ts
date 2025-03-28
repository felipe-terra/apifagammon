import { GenericRepository } from 'src/core/repository/generic.repository';
import { FindOptionsOrder, Repository } from 'typeorm';
import { Schedule } from '../entity/schedules';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleRepository extends GenericRepository<Schedule> {
  entityName: string = 'Schedule';
  relations: string[] = ['place_configuration', 'place_configuration.place'];
  constructor(public repository: Repository<Schedule>) {
    super(repository);
  }

  async alreadyScheduled(id: number, date: string): Promise<boolean> {
    const sql = 'SELECT COUNT(*) FROM schedules s WHERE id_place_configuration = $1 AND date = $2';
    const result = await this.repository.query(sql, [id, date]);

    return result[0].count > 0;
  }

  async findAllByUser(userId: number): Promise<Schedule[]> {
    return this.repository.find({
      order: {
        created_at: 'DESC',
      } as FindOptionsOrder<Schedule>,
      where: {
        id_user_requested: userId,
      },
      relations: this.relations,
      loadEagerRelations: true,
    });
  }
}
