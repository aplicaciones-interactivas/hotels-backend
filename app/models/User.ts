import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    Unique,
    Is, DataType, IsEmail, AllowNull, BelongsToMany
} from 'sequelize-typescript';
import {Role} from "./Role";
import {UserRole} from "./relationship/UserRole";
import {UsernameValidator} from "./validations/impl/UsernameValidator";


@Table
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.STRING(20))
    @Unique
    @AllowNull(false)
    @Is(new UsernameValidator().validate)
    username!: string;

    @Column(DataType.STRING(255))
    @AllowNull(false)
    password!: string;

    @Column(DataType.STRING(255))
    @AllowNull(false)
    @IsEmail
    email!: string;

    @Column(DataType.BIGINT)
    @AllowNull(false)
    organizationId!: number;

    @BelongsToMany(() => Role, () => UserRole)
    roles!:Role[];

}

