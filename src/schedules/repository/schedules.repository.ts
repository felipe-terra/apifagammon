import { GenericRepository } from 'src/core/repository/generic.repository';
import { FindOptionsOrder, Repository } from 'typeorm';
import { Schedule } from '../entity/schedules';
import { Injectable } from '@nestjs/common';
import { EScheduleStatus } from '../entity/eschedule-status';
import { RequestPaginationDto } from 'src/core/dto/request-pagination.dto';
import { ResponsePaginationDto } from 'src/core/dto/response-pagination.dto';

@Injectable()
export class ScheduleRepository extends GenericRepository<Schedule> {
  entityName: string = 'Schedule';
  relations: string[] = [
    'place_configuration',
    'place_configuration.place',
    'user_requested',
    'user_cancelled',
  ];
  relationEager: boolean = true;
  order: FindOptionsOrder<Schedule> = {
    created_at: 'DESC',
  };

  constructor(public repository: Repository<Schedule>) {
    super(repository);
  }

  async alreadyScheduled(id: number, date: string): Promise<boolean> {
    const sql =
      'SELECT COUNT(*) FROM schedules s WHERE id_place_configuration = $1 AND date = $2 AND date_cancelled IS NULL';
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

  async findAllPublic(props: RequestPaginationDto): Promise<ResponsePaginationDto<Schedule>> {
    if (!props.page || props.page < 0) props.page = 0;
    if (!props.recordsPerPage || props.recordsPerPage < 10) props.recordsPerPage = 10;

    const data = await this.repository.find({
      skip: +props.page * +props.recordsPerPage,
      take: +props.recordsPerPage,
      order: this.order,
      relations: this.relations,
      loadEagerRelations: this.relationEager,
      where: {
        status: EScheduleStatus.AGENDADO,
      },
    });

    const totalRecords = await this.repository.count({
      where: {
        status: EScheduleStatus.AGENDADO,
      },
    });

    return {
      data: data,
      totalRecords: totalRecords,
    };
  }

  async isBlocked(placeId: number): Promise<boolean> {
    const sql = 'SELECT COUNT(*) FROM global_blocks s WHERE id_place_configuration = $1';
    const result = await this.repository.query(sql, [placeId]);
    return result[0].count > 0;
  }
}
