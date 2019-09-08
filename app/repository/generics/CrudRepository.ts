import {Model} from "sequelize-typescript";
import {BuildOptions} from "sequelize";

export type ModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): Model;
}

export interface CrudRepository<T extends Model, ID> {
    count(filter?: any): Promise<number>;

    deleteById(id: ID): Promise<number>;

    existsById(id: ID): Promise<boolean>;

    findAll(filter?: any): Promise<Model<T>[]>;

    findById(id: ID): Promise<T>;

    create(instance: T): Promise<T>;

    update(instance: T): Promise<T>;
}
