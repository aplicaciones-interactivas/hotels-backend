import {Column, DataType, ForeignKey, Model} from "sequelize-typescript";
import {Room} from "../Room";
import {Bed} from "../Bed";

export class RoomBed extends Model<RoomBed>{

    @ForeignKey(() => Room)
    @Column(DataType.BIGINT)
    roomId!: number;
    @ForeignKey(() => Bed)
    @Column(DataType.BIGINT)
    bedId!: number;

}