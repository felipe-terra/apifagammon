import { HttpException } from '@nestjs/common';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';

export interface Entity {
  id: number;
}

export abstract class GenericRepository<T extends Entity> {
  abstract entityName: string;
  relations: string[];
  relationEager: boolean = false;
  order: FindOptionsOrder<T> = {
    id: 'ASC',
  } as FindOptionsOrder<T>;
  constructor(public repository: Repository<T>) {}

  async create(item: T): Promise<T> {
    const data = this.repository.create(item);
    return this.repository.save(data);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find({
      order: this.order,
      relations: this.relations,
      loadEagerRelations: this.relationEager,
    });
  }

  async findById(id: number): Promise<T> {
    const data = await this.repository.findOne({
      where: {
        id,
      } as FindOptionsWhere<T>,
      relations: this.relations,
      loadEagerRelations: true,
    });

    if (!data) {
      throw new HttpException(`${this.entityName} not found`, 404);
    }

    return data;
  }

  async update(item: T): Promise<T> {
    await this.findById(item.id);
    const data = await this.repository.preload(item);

    return this.repository.save(data);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.findById(id);
    await this.repository.softDelete(id);
  }
}
