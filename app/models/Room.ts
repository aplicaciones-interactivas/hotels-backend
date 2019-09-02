import {AllowNull, Model} from "sequelize-typescript";
import {AutoIncrement, BelongsToMany, Column, DataType, PrimaryKey} from "sequelize-typescript";
import {Amenity} from "./Amenity";
import {RoomAmenity} from "./relationship/RoomAmenity";
import {Bed} from "./Bed";
import {RoomBed} from "./relationship/RoomBed";

export class Room extends Model<Room> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.ENUM('SINGLE','DOUBLE','TRIPLE','QUAD','QUEEN','KING','DOUBLE_DOUBLE','STUDIO','SUITE','MASTER_SUITE','JUNIOR_SUITE'))
    @AllowNull(false)
    type!: string;

    @Column(DataType.INTEGER)
    maxOcupancy?:number;

    @Column(DataType.DOUBLE)
    surfaceArea?:number;

    @Column(DataType.INTEGER)
    guests?: number;

    @BelongsToMany(() => Amenity, () => RoomAmenity)
    amenities?: Amenity[];

    @BelongsToMany(() => Bed, () => RoomBed)
    beds?: Bed[];

}