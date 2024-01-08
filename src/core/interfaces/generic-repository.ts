import { DeepPartial, DeleteResult } from 'typeorm';

export interface IGenericRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  create(data: DeepPartial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<any>;
  delete(id: number): Promise<DeleteResult>;
}
