import { GenericRepository } from 'src/core/repository/generic.repository';
import { Repository } from 'typeorm';
import { PlaceConfiguration } from '../entity/place-configurations';
import { EDayOfWeek } from '../entity/eday-of-week';

export class PlaceConfigurationRepository extends GenericRepository<PlaceConfiguration> {
  entityName: string = 'PlaceConfiguration';

  constructor(public repository: Repository<PlaceConfiguration>) {
    super(repository);
  }

  async getCombo(id_place: number, day_of_week: EDayOfWeek): Promise<any> {
    const sql = `
        SELECT 
          id AS value,
          concat(TO_CHAR(start_time, 'HH24:MI'), ' - ', TO_CHAR(end_time, 'HH24:MI')) AS label 
        FROM place_configurations pc 
        WHERE id_place = $1 AND day_of_week = $2 ORDER BY "order";`;

    const result = await this.repository.query(sql, [id_place, day_of_week]);
    return result;
  }
}
