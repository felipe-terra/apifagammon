export class ResponsePaginationDto<T> {
  data: T[] = [];
  totalRecords: number = 0;
}
