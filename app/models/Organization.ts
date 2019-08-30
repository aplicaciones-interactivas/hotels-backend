import {AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Scopes} from "sequelize-typescript";
import { Hotel } from "./Hotel";
import { User  } from "./User";


@Scopes(() => ({
    hotels: {
        include: [{
            model: Hotel
        }]
    },
    users: {
        include: [{
            model: User
        }]
    }
}))
export class Organization extends Model<Organization> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.TEXT)
    @AllowNull(false)
    billingAddress!: string;

    @Column(DataType.STRING(50))
    @AllowNull(false)
    country!: string;

    @Column(DataType.STRING(255))
    @AllowNull(false)
    billingIdentifier!: string;

    @Column(DataType.STRING(255))
    @AllowNull(false)
    name!: string;

    @HasMany(() => Hotel)
    hotels?: Hotel[];

    @HasMany(() => User)
    users!: User[];

}


