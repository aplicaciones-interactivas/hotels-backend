import {SimpleBaseRepository} from "./generics/SimpleBaseRepository";
import {Room} from "../models/Room";

export class RoomRepository extends SimpleBaseRepository<Room> {
    constructor() {
        super(Room);
    }
}