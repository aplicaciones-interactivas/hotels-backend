import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../User";
import {Organization} from "../Organization";

@Table
export class UserOrganization extends Model<UserOrganization>{

    @ForeignKey(() => User)
    @Column(DataType.BIGINT)
    userId!: number;
    @ForeignKey(() => Organization)
    @Column(DataType.BIGINT)
    organizationId!: number;

}