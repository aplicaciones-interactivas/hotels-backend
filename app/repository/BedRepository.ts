import {SimpleBaseRepository} from "./generics/SimpleBaseRepository";
import {Bed} from "../models/Bed";

export class BedRepository extends SimpleBaseRepository<Bed> {
    constructor() {
        super(Bed);
    }
}