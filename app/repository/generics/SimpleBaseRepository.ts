import {CRUDRepository, ModelStatic} from "./CRUDRepository";
import {Model} from "sequelize-typescript";
import {JoinableBaseRepository} from "./JoinableBaseRepository";


export abstract class SimpleBaseRepository<T extends Model> extends JoinableBaseRepository<T> implements CRUDRepository<T> {

    public count(options?: any): Promise<number> {
        return super.count(options);
    }

    public deleteById(id: number): Promise<number> {
        return super.deleteById(id);
    }

    public existsById(id: number, options?: any): Promise<boolean> {
        return super.existsById(id, options);
    }

    public findAll(filter?: any): Promise<T[]> {
        return super.findAll(filter);
    }

    public findById(id: number): Promise<T> {
        return super.findById(id);
    }

    public create(instance: any): Promise<T> {
        return super.create(instance);
    }

    public update(id: number, instance: any): Promise<T> {
        return super.update(id, instance);
    }
}
