import { GenericRepository } from 'src/core/repository/generic.repository';
import { Place } from '../entity/places';
import { Repository } from 'typeorm';

export class PlaceRepository extends GenericRepository<Place> {
  entityName: string = 'Place';

  constructor(public repository: Repository<Place>) {
    super(repository);
  }
}
