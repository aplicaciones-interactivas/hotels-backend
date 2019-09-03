import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey} from "sequelize-typescript";

export class Role extends Model<Role> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;
    @AllowNull(false)
    @Column(DataType.STRING(50))
    role_name!: string;
}
