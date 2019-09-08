import {CrudRepository, ModelStatic} from "./CrudRepository";
import {Model} from "sequelize-typescript";
import {Identifier} from "sequelize";


export abstract class SimpleBaseRepository<T extends Model, ID extends Identifier> implements CrudRepository<T, ID> {

    model: ModelStatic;

    constructor(model: ModelStatic) {
        this.model = model;
    }

    count(options?: any): Promise<number> {
        return this.model.count({
            where: options
        });
    }

    deleteById(id: ID, options?: any): Promise<void> {
        throw new Error('Method not implemented.');
    }

    existsById(id: ID, options?: any): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    findAll(filter?: any): Promise<Model<T>[]> {
        return this.model.findAll({
            where: filter
        });
    }

    findById(id: ID): Promise<T> {
        return this.model.findByPk(id);
    }

    create(instance: T[] | T): Promise<T> | Promise<T[]> {
        throw new Error('Method not implemented.');
    }

    update(instance: T[] | T): Promise<T> | Promise<T[]> {
        throw new Error('Method not implemented.');
    }

}
