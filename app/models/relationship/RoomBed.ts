import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Room} from "../Room";
import {Bed} from "../Bed";

@Table
export class RoomBed extends Model<RoomBed>{

    @ForeignKey(() => Room)
    @Column(DataType.BIGINT)
    roomId!: number;
    @ForeignKey(() => Bed)
    @Column(DataType.BIGINT)
    bedId!: number;

}