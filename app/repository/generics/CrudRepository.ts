import {Model} from "sequelize-typescript";

export interface CrudRepository<T extends Model, ID> {
    count(): Promise<number>;
    deleteById(id : ID, options?: any): Promise<void>;
    existsById(id : ID, options?: any): Promise<boolean>;
    findAll(options?: any): Promise<T[]>;
    findById(id: ID, options?: any) : Promise<T>;
    create(instance: T, options?: any): Promise<T>;
    update(instance: T, options?: any): Promise<T>;
    createAll(instance: T[], options?: any): Promise<T[]>;
    updateAll(instance: T[], options?: any): Promise<T[]>;
}
