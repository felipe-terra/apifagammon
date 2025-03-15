import { FindOptionsWhere, Repository, EntityNotFoundError } from 'typeorm';

export interface Entity {
  id: number;
}

export class GenericRepository<T extends Entity> {
  constructor(public repository: Repository<T>) {}

  async create(item: T): Promise<T> {
    const data = this.repository.create(item);
    return this.repository.save(data);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<T> {
    const data = await this.repository.findOne({
      where: {
        id,
      } as FindOptionsWhere<T>,
      loadEagerRelations: true,
    });

    if (!data) {
      throw new EntityNotFoundError(this.repository.target as any, id);
    }

    return data;
  }

  async update(item: T): Promise<T> {
    await this.findById(item.id);
    const data = await this.repository.preload(item);

    if (!data) {
      throw new EntityNotFoundError(this.repository.target as any, item.id);
    }

    return this.repository.save(data);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new EntityNotFoundError(this.repository.target as any, id);
    }
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.repository.softDelete(id);
    if (result.affected === 0) {
      throw new EntityNotFoundError(this.repository.target as any, id);
    }
    return;
  }
}
