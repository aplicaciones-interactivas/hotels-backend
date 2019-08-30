import {Column, DataType, ForeignKey, Model} from "sequelize-typescript";
import {Room} from "../Room";
import {Amenity} from "../Amenity";

export class RoomAmenity extends Model<RoomAmenity>{

    @ForeignKey(() => Room)
    @Column(DataType.BIGINT)
    roomId!: number;
    @ForeignKey(() => Amenity)
    @Column(DataType.BIGINT)
    amenityId!: number;

}