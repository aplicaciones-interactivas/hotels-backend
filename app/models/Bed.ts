import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Bed {

    @PrimaryGeneratedColumn()
    id!: number;
    @Column("varchar")
    @IsNotEmpty()
    name!: string;
    @Column("varchar")
    @IsNotEmpty()
    code!: string;

}
