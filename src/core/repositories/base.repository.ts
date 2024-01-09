import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { IGenericRepository } from '../interfaces/generic-repository';

export abstract class BaseRepository<T> implements IGenericRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  /**
   * Finds entities based on specified conditions and additional parameters.
   *
   * @param tableName - The name of the main table to query.
   * @param conditions - Partial object representing the conditions for the query.
   * @param joinTables - Array of objects specifying tables to join and select.
   * @param selectedColumns - Array of column names to select from the main table.
   * @param orderBy - Object specifying the column and order for sorting the result.
   * @param limit - Maximum number of entities to retrieve.
   * @returns A Promise containing an array of entities that meet the specified conditions.
   */
  async findByCondition(
    tableName: string,
    conditions?: Partial<T>,
    joinTables?: { table: string; joinTable: string }[],
    selectedColumns?: string[],
    orderBy?: { column: string; order: 'ASC' | 'DESC' },
    limit?: number,
  ): Promise<T[]> {
    // Create a query builder for the specified main table
    const queryBuilder = this.repository.createQueryBuilder(tableName);

    // Add WHERE clauses based on specified conditions
    if (conditions) {
      Object.entries(conditions).forEach(([key, value]) => {
        queryBuilder.andWhere(`${tableName}.${key} = :${key}`, { [key]: value });
      });
    }

    // Select specific columns if provided
    if (selectedColumns && selectedColumns.length > 0) {
      queryBuilder.select(selectedColumns.map((column) => `${column}`));
    }

    // Inner join and select additional tables if specified
    if (joinTables) {
      joinTables.forEach(({ table, joinTable }) => {
        queryBuilder.innerJoinAndSelect(table, joinTable);
      });
    }

    // Order the result based on specified column and order
    if (orderBy) {
      queryBuilder.orderBy(orderBy.column, orderBy.order);
    }

    // Limit the number of entities retrieved if specified
    if (limit) {
      queryBuilder.limit(limit);
    }

    // Execute the query and return the result as an array of entities
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
