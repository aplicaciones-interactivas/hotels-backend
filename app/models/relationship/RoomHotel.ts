import {Column, DataType, ForeignKey, Model} from "sequelize-typescript";
import {Hotel} from "../Hotel";
import {Room} from "../Room";

export class RoomHotel extends Model<RoomHotel> {
    @ForeignKey(() => Hotel)
    @Column(DataType.BIGINT)
    hotelId!: number;
    @ForeignKey(() => Room)
    @Column(DataType.BIGINT)
    roomId!: number;
}