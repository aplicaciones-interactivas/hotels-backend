import {Hotel} from "./Hotel";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
export class HotelImage {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Hotel)
    @JoinColumn()
    hotel!: Hotel;
    @Column("text")
    @IsNotEmpty()
    path!: string;
}
