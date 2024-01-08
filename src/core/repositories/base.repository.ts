import { DeepPartial, DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { IGenericRepository } from '../interfaces/generic-repository';

export abstract class BaseRepository<T> implements IGenericRepository<T> {
  
  constructor(private readonly repository: Repository<T>) {}

  async findByCondition(
    conditions: Partial<T>,
    joinTables?: { table: string; joinTable: string; }[],
    selectedColumns?: string[],
    orderBy?: { column: string; order: 'ASC' | 'DESC' },
    limit?: number,
  ): Promise<T[]> {
    const tableName = this.repository.target as string;
    const queryBuilder = this.repository.createQueryBuilder(tableName);

    Object.entries(conditions).forEach(([key, value]) => {
      queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
    });

    if (selectedColumns && selectedColumns.length > 0) {
      queryBuilder.select(selectedColumns.map((column) => `${column}`));
    }

    if (joinTables) {
      joinTables.forEach(({ table, joinTable }) => {
        queryBuilder.leftJoinAndSelect(table, joinTable);
      });
    }

    if (orderBy) {
      queryBuilder.orderBy(`entity.${orderBy.column}`, orderBy.order);
    }

    // Áp dụng giới hạn nếu được đặt
    if (limit) {
      queryBuilder.limit(limit);
    }

    return queryBuilder.getMany();
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: any): Promise<T> {
    return await this.repository.findOne(id);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(id: number, data: Partial<unknown>): Promise<T> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
