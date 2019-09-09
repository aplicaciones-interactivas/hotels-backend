import {Model} from "sequelize-typescript";
import {BuildOptions} from "sequelize";

export type ModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): Model;
}

export interface CRUDRepository<T extends Model> {
    count(filter?: any): Promise<number>;

    deleteById(id: number): Promise<number>;

    existsById(id: number): Promise<boolean>;

    findAll(filter?: any): Promise<T[]>;

    findById(id: number): Promise<T>;

    create(instance: any): Promise<T>;

    update(id: number, instance: any): Promise<T>;
}
