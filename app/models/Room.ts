import {AllowNull, HasMany, Model, Scopes, Table} from "sequelize-typescript";
import {AutoIncrement, BelongsToMany, Column, DataType, PrimaryKey} from "sequelize-typescript";
import {Amenity} from "./Amenity";
import {RoomAmenity} from "./relationship/RoomAmenity";
import {Bed} from "./Bed";
import {RoomBed} from "./relationship/RoomBed";


@Table
export class Room extends Model<Room> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;

    @AllowNull(false)
    @Column(DataType.ENUM('SINGLE', 'DOUBLE', 'TRIPLE', 'QUAD', 'QUEEN', 'KING', 'DOUBLE_DOUBLE', 'STUDIO', 'SUITE', 'MASTER_SUITE', 'JUNIOR_SUITE'))
    type!: string;

    @Column(DataType.INTEGER)
    maxOcupancy?: number;

    @Column(DataType.DOUBLE)
    surfaceArea?: number;

    @Column(DataType.INTEGER)
    guests?: number;

    @BelongsToMany(() => Amenity, () => RoomAmenity)
    amenities?: Amenity[];

    @BelongsToMany(() => Bed, () => RoomBed)
    beds?: Bed[];

}
