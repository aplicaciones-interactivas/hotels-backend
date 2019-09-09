import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Scopes,
    Table
} from "sequelize-typescript";
import {Hotel} from "./Hotel";
import {User} from "./User";

@Table
export class Organization extends Model<Organization> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    billingAddress!: string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    country!: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    billingIdentifier!: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    name!: string;

    @HasMany(() => Hotel)
    hotels?: Hotel[];

    @HasMany(() => User)
    users!: User[];

}


