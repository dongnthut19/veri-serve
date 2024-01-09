import { DeepPartial, DeleteResult } from 'typeorm';

export interface IGenericRepository<T> {
  findByCondition(
    tableName: string,
    conditions?: Partial<T>,
    joinTables?: { table: string; joinTable: string }[],
    selectedColumns?: string[],
    orderBy?: { column: string; order: 'ASC' | 'DESC' },
    limit?: number,
  ): Promise<T[]>;

  findAll(): Promise<T[]>;

  findById(id: number): Promise<T>;

  create(data: DeepPartial<T>): Promise<T>;

  update(id: number, data: Partial<T>): Promise<any>;

  delete(id: number): Promise<DeleteResult>;
}
