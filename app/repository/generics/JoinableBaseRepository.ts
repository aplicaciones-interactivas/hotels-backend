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
        let relationshipKeys = this.getAssociationKeys(instance);
        return this.model.create(instance).then(entity => {
            if (relationshipKeys) {
                let associationPromises = this.getAssociationPromises(relationshipKeys, entity, instance);
                return this.resolveAssociation(associationPromises, entity, include);
            } else {
                return entity;
            }
        });
    }


    //agregar los ids de las asociaciones antes de guardar ¬¬
    public update(id: number, instance: any, include?: any): Promise<T> {
        let relationshipKeys = this.getAssociationKeys(instance);
        return this.findById(id).then(async (entity) => {
            let json = (await this.findById(id)).toJSON();
            await Object.keys(instance).forEach(key => {
                //@ts-ignore
                entity[key] = instance[key];
            });
            entity = await entity.save();
            return entity.reload({
                include: include
            })
        });
    }

    private resolveAssociation(associationPromises: Promise<T>[], entity: any, include: any) {
        return Promise.all(associationPromises).then(result => {
            return entity.reload({
                include: include
            });
        });
    }

    private getAssociationKeys(instance: any): string[] {
        return Object.keys(instance).filter((k: string) => Array.isArray(instance[k]));
    }

    private getAssociationPromises(relationshipKeys: string[], entity: any, instance: any): Promise<T>[] {
        let associationPromises: Promise<T>[] = [];
        relationshipKeys.forEach(async (rk: string) => {
            //@ts-ignore
            associationPromises.push(entity.$set(rk, instance[rk]))
        });
        return associationPromises;
    }

    private resolveUpdate(res: [any, any], id: number) {
        if (res[0])
            return this.findById(id);
        throw new Error("Entity with id=[" + id + "] not exists");
    }

}
