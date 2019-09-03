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

    @Unique
    @AllowNull(false)
    @Is(new UsernameValidator().validate)
    @Column(DataType.STRING(20))
    username!: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    password!: string;

    @AllowNull(false)
    @IsEmail
    @Column(DataType.STRING(255))
    email!: string;

    @AllowNull(false)
    @Column(DataType.BIGINT)
    organizationId!: number;

    @BelongsToMany(() => Role, () => UserRole)
    roles!:Role[];

}

