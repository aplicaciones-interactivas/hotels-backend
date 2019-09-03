import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey} from "sequelize-typescript";

export class Bed extends Model<Bed> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;
    @AllowNull(false)
    @Column(DataType.STRING(100))
    name!: string;
    @AllowNull(false)
    @Column(DataType.STRING(10))
    code!: string;

}
