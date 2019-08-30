import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey} from "sequelize-typescript";

export class Amenity extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;
    @Column(DataType.STRING(10))
    code!: string;
    @Column(DataType.TEXT)
    @AllowNull(false)
    description!: string;
}