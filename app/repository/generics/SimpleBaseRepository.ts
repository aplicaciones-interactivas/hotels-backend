import {CrudRepository, ModelStatic} from "./CrudRepository";
import {Model, Sequelize} from "sequelize-typescript";
import {BuildOptions} from "sequelize";


export abstract class SimpleBaseRepository<T extends Model, ID> implements CrudRepository<T, ID> {

    model: ModelStatic;

    constructor(model: ModelStatic) {
        this.model = model;
    }

    count(): Promise<number> {
        throw new Error('Method not implemented.');
    }

    create(instance: T, options?: any): Promise<T> {
        throw new Error('Method not implemented.');
    }

    createAll(instance: T[], options?: any): Promise<T[]> {
        throw new Error('Method not implemented.');
    }

    deleteById(id: ID, options?: any): Promise<void> {
        throw new Error('Method not implemented.');
    }

    existsById(id: ID, options?: any): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    findAll(options?: any): Promise<Model<T>[]> {
        return this.model.findAll(options);
    }

    findById(id: ID, options?: any): Promise<T> {
        throw new Error('Method not implemented.');
    }

    update(instance: T, options?: any): Promise<T> {
        throw new Error('Method not implemented.');
    }

    updateAll(instance: T[], options?: any): Promise<T[]> {
        throw new Error('Method not implemented.');
    }

}
