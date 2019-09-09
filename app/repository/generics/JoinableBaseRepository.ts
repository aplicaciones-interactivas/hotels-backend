import {CRUDRepository, ModelStatic} from "./CRUDRepository";
import {Model} from "sequelize-typescript";


export abstract class JoinableBaseRepository<T extends Model> implements CRUDRepository<T> {

    protected model: ModelStatic;

    protected constructor(model: ModelStatic) {
        this.model = model;
    }

    public count(options?: any): Promise<number> {
        return this.model.count({
            where: options
        });
    }

    public deleteById(id: number): Promise<number> {
        //@ts-ignore
        return this.model.destroy({
            where: {id: id}
        });
    }

    public existsById(id: number, options?: any): Promise<boolean> {
        return this.count({
            id: id
        }).then(result => {
            return !!result;
        });
    }

    public findAll(filter?: any, include?: any): Promise<T[]> {
        return this.model.findAll({
            where: filter,
            include: include
        });
    }

    public findById(id: number, include?: any): Promise<T> {
        return this.model.findByPk(id, {
            include: include
        });
    }

    public create(instance: any, include?: any): Promise<T> {
        let relationshipKeys = Object.keys(instance).filter((k: string) => Array.isArray(instance[k]));
        return this.model.create(instance).then(entity => {
            if (relationshipKeys) {
                let associationPromises: Promise<T>[] = [];
                relationshipKeys.forEach(async (rk: string) => {
                    associationPromises.push(entity.$add(rk, instance[rk]));
                });
                return Promise.all(associationPromises).then(result => {
                    return entity.reload({
                        include: include
                    });
                });
            } else {
                return entity;
            }
        });
    }

    public update(id: number, instance: any, include?: any): Promise<T> {
        return this.model.update(instance, {
            where: {
                id: id
            }
        }).then(res => this.resolveUpdate(res, id));
    }

    private resolveUpdate(res: [any, any], id: number) {
        if (res[0])
            return this.findById(id);
        throw new Error("Entity with id=[" + id + "] not exists");
    }

}
