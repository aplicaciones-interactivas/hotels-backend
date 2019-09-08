import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Hotel} from "../Hotel";
import {Room} from "../Room";

@Table
export class RoomHotel extends Model<RoomHotel> {
    @ForeignKey(() => Hotel)
    @Column(DataType.BIGINT)
    hotelId!: number;
    @ForeignKey(() => Room)
    @Column(DataType.BIGINT)
    roomId!: number;
}