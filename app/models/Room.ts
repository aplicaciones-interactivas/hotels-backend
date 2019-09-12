import {Amenity} from "./Amenity";
import {Bed} from "./Bed";
import {Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id!: number;

    //@Column(DataType.ENUM('SINGLE', 'DOUBLE', 'TRIPLE', 'QUAD', 'QUEEN', 'KING', 'DOUBLE_DOUBLE', 'STUDIO', 'SUITE', 'MASTER_SUITE', 'JUNIOR_SUITE'))
    @IsNotEmpty()
    @Column("varchar")
    type!: string;

    @Column("integer")
    maxOcupancy?: number;

    @Column("decimal")
    surfaceArea?: number;

    @Column("integer")
    guests?: number;

    @ManyToMany(() => Amenity)
    @JoinTable()
    amenities?: Amenity[];

    @ManyToMany(() => Bed)
    @JoinTable()
    beds?: Bed[];

}
