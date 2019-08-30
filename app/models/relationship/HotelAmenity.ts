import {Column, DataType, ForeignKey, Model} from "sequelize-typescript";
import {Hotel} from "../Hotel";
import {Amenity} from "../Amenity";

export class HotelAmenity extends Model<HotelAmenity> {

    @ForeignKey(() => Hotel)
    @Column(DataType.BIGINT)
    hotelId!: number;
    @ForeignKey(() => Amenity)
    @Column(DataType.BIGINT)
    amenityId!: number;
}