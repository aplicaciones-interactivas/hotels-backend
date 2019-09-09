import {Model} from "sequelize-typescript";
import {BuildOptions} from "sequelize";

export type ModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): Model;
}

export interface JoineableCRUDRepository<T extends Model> {
    count(filter?: any): Promise<number>;

    deleteById(id: number): Promise<number>;

    existsById(id: number): Promise<boolean>;

    findAll(filter?: any, include?: any): Promise<T[]>;

    findById(id: number, include?: any): Promise<T>;

    create(instance: any, include?: any): Promise<T>;

    update(id: number, instance: any, include?: any): Promise<T>;
}
