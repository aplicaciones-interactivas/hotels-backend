import {SimpleBaseRepository} from "./generics/SimpleBaseRepository";
import {Bed} from "../models/Bed";
import {injectable, singleton} from "tsyringe";
import {BedMapper} from "../mapper/BedMapper";

export class BedRepository extends SimpleBaseRepository<Bed> {
    constructor(mapper: BedMapper) {
        super(Bed, mapper);
    }

}