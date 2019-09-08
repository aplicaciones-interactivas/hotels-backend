import {CrudRepository, ModelStatic} from "./CrudRepository";
import {Model} from "sequelize-typescript";


export abstract class SimpleBaseRepository<T extends Model> implements CrudRepository<T> {

    model: ModelStatic;

    protected constructor(model: ModelStatic) {
        this.model = model;
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

    create(instance: any): Promise<T> {
        return this.model.create(instance);
    }

    update(id: number, instance: any): Promise<T> {
        return this.model.update(instance, {
            where: {
                id: id
            }
        }).then(res => {
            if (res[0])
                return this.findById(id);
            throw new Error("Entity with id=[" + id + "] not exists");
        });
    }

}
