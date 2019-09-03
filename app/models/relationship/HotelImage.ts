import {Column, DataType, ForeignKey, Model, NotNull} from "sequelize-typescript";
import {Hotel} from "../Hotel";

export class HotelImage extends Model<HotelImage> {
    @ForeignKey(() => Hotel)
    @NotNull
    @Column(DataType.BIGINT)
    hotelId!: number;
    @NotNull
    @Column(DataType.STRING)
    path!: string;
}
