import {AllowNull, Column, DataType, ForeignKey, Model, NotNull, Table} from "sequelize-typescript";
import {Hotel} from "../Hotel";

@Table
export class HotelImage extends Model<HotelImage> {
    @ForeignKey(() => Hotel)
    @Column(DataType.BIGINT)
    hotelId!: number;
    @AllowNull(false)
    @Column(DataType.STRING)
    path!: string;
}
