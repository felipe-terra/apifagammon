export type FilterDto = {
  column: string;
  value: string;
  operator: FilterOperator;
};

export enum FilterOperator {
  EQUAL = 'equal',
  BETWEEN = 'between',
}
