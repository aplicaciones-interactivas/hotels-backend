import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Amenity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column("varchar")
    code!: string;
    @Column("text")
    @IsNotEmpty()
    description!: string;
}
