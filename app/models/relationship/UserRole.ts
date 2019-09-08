import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../User";
import {Role} from "../Role";

@Table
export class UserRole extends Model<UserRole>{

    @ForeignKey(()=> User)
    @Column(DataType.NUMBER)
    userId!: number;
    @ForeignKey(()=> Role)
    @Column(DataType.NUMBER)
    roleId!: number;
}