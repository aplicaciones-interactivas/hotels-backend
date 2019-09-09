import {SimpleBaseRepository} from "./generics/SimpleBaseRepository";
import {Reservation} from "../models/Reservation";

export class ReservationRepository extends SimpleBaseRepository<Reservation> {
    constructor() {
        super(Reservation);
    }
}