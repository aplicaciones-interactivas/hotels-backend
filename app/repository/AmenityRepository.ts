import {SimpleBaseRepository} from "./generics/SimpleBaseRepository";
import {Amenity} from "../models/Amenity";

export class AmenityRepository extends SimpleBaseRepository<Amenity> {
    constructor() {
        super(Amenity);
    }
}