import {Hotel} from "./Hotel";
import {User} from "./User";
import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Organization {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    @IsNotEmpty()
    billingAddress!: string;

    @Column("varchar")
    @IsNotEmpty()
    country!: string;

    @Column("varchar")
    @IsNotEmpty()
    billingIdentifier!: string;

    @Column("varchar")
    @IsNotEmpty()
    name!: string;

    @OneToMany(() => Hotel, hotel => hotel.organization)
    @JoinColumn()
    hotels?: Hotel[];

    @OneToMany(() => User, user => user.organization)
    @JoinColumn()
    users!: User[];

}


