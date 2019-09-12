import {Role} from "./Role";
import {Organization} from "./Organization";
import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty} from "class-validator";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    @Length(20)
    @IsNotEmpty()
    username!: string;

    @Column("varchar")
    @IsNotEmpty()
    password!: string;

    @Column("varchar")
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ManyToOne(() => Organization)
    @JoinColumn()
    organization?: Organization;

    @ManyToMany(type => Role)
    @JoinTable()
    roles!: Role[];

}

