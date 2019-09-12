import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    @IsNotEmpty()
    roleName!: string;
}
