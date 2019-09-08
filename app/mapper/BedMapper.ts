import {Mapper} from "./Mapper";
import {Bed} from "../models/Bed";

export class BedMapper implements Mapper<Bed>{
    toPersistance(model: Bed): any {
        return {
            name: model.name,
            code: model.code
        };
    }

}