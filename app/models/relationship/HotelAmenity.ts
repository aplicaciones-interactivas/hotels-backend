import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Hotel} from "../Hotel";
import {Amenity} from "../Amenity";

@Table
export class HotelAmenity extends Model<HotelAmenity> {

    @ForeignKey(() => Hotel)
    @Column(DataType.BIGINT)
    hotelId!: number;
    @ForeignKey(() => Amenity)
    @Column(DataType.BIGINT)
    amenityId!: number;
}