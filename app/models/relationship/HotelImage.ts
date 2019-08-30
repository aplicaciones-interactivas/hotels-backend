import {Column, DataType, ForeignKey, Model, NotNull} from "sequelize-typescript";
import {Hotel} from "../Hotel";

export class HotelImage extends Model<HotelImage> {
    @ForeignKey(() => Hotel)
    @Column(DataType.BIGINT)
    @NotNull
    hotelId!: number;
    @Column(DataType.STRING)
    @NotNull
    path!: string;
}