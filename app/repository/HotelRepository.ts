import {SimpleBaseRepository} from "./generics/SimpleBaseRepository";
import {Hotel} from "../models/Hotel";

export class HotelRepository extends SimpleBaseRepository<Hotel> {
    constructor() {
        super(Hotel);
    }

}