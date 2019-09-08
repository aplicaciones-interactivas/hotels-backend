import {CrudRepository, ModelStatic} from "./CrudRepository";
import {Model} from "sequelize-typescript";
import {Identifier} from "sequelize";
import {Mapper} from "../../mapper/Mapper";

export abstract class SimpleBaseRepository<T extends Model> implements CrudRepository<T> {

    model: ModelStatic;
    mapper: Mapper<T>;

    constructor(model: ModelStatic, mapper: Mapper<T>) {
        this.model = model;
        this.mapper = mapper;
    }

    count(options?: any): Promise<number> {
        return this.model.count({
            where: options
        });
    }

    deleteById(id: number): Promise<number> {
        //@ts-ignore
        return this.model.destroy({
            where: {id: id}
        });
    }

    existsById(id: number, options?: any): Promise<boolean> {
        return this.count({
            id: id
        }).then(result => {
            return !!result;
        })
    }

    findAll(filter?: any): Promise<Model<T>[]> {
        return this.model.findAll({
            where: filter
        });
    }

    findById(id: number): Promise<T> {
        return this.model.findByPk(id);
    }

    create(instance: T): Promise<T> {
        return this.model.create(this.mapper.toPersistance(instance));
    }

    update(id: number, instance: T): Promise<T> {

        return this.model.update(this.mapper.toPersistance(instance), {
            where: {
                id: id
            }
        }).then(res => {
            return this.findById(id);
        });
    }

}
