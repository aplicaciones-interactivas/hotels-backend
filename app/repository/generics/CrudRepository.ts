import {Model} from "sequelize-typescript";
import {BuildOptions} from "sequelize";

export type ModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): Model;
}

export interface CrudRepository<T extends Model, ID> {
    count(): Promise<number>;
    deleteById(id : ID, options?: any): Promise<void>;
    existsById(id : ID, options?: any): Promise<boolean>;
    findAll(options?: any): Promise<Model<T>[]>;
    findById(id: ID, options?: any) : Promise<T>;
    create(instance: T, options?: any): Promise<T>;
    update(instance: T, options?: any): Promise<T>;
    createAll(instance: T[], options?: any): Promise<T[]>;
    updateAll(instance: T[], options?: any): Promise<T[]>;
}
