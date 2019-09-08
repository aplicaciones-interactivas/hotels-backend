import {Model} from "sequelize-typescript";

export interface Mapper<T extends Model> {

    toPersistance(model: T): any;

}