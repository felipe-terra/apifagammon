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

  //TODO: Criar uma função pra verificar se o ambiente está disponível no horário escolhido.

  async findAllByUser(userId: number): Promise<Schedule[]> {
    return this.repository.find({
      order: {
        id: 'ASC',
      } as FindOptionsOrder<Schedule>,
      where: {
        id_user_requested: userId,
      },
      relations: this.relations,
      loadEagerRelations: true,
    });
  }
}
