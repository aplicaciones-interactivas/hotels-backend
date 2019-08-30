import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey} from "sequelize-typescript";

export class Bed extends Model<Bed> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;
    @Column(DataType.STRING(100))
    @AllowNull(false)
    name!: string;
    @Column(DataType.STRING(10))
    @AllowNull(false)
    code!: string;

}