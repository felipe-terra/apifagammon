import { Between, Equal } from 'typeorm';
import { FilterDto, FilterOperator } from '../dto/filter.dto';

export function filterBuilder(filter: FilterDto[]) {
  const where: any = {};

  if (filter && filter.length > 0) {
    filter.forEach((f) => {
      if (f.operator === FilterOperator.EQUAL) {
        where[f.column] = Equal(f.value);
      } else if (f.operator === FilterOperator.BETWEEN) {
        const value = f.value.split(':');
        where[f.column] = Between(value[0] + 'T00:00:00', value[1] + 'T23:59:59');
      }
    });
  }

  return where;
}
