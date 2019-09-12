import {Amenity} from './Amenity';
import {Room} from "./Room";
import {MealPlan} from "./MealPlan";
import {Organization} from "./Organization";
import {Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn, JoinColumn, JoinTable} from "typeorm";
import {IsEmail, IsNotEmpty} from "class-validator";
import {HotelImage} from "./HotelImage";

@Entity()
export class Hotel {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    @IsNotEmpty()
    name!: string;
    @Column("varchar")
    @IsEmail()
    contactEmail?: string;
    @Column("varchar")
    primaryContactPhone?: string;
    @Column("varchar")
    secondaryContactPhone?: string;
    @Column("varchar")
    checkinTime?: string;
    @Column("varchar")
    checkoutTime?: string;
    @Column("integer")
    stars?: number;
    //@Column(DataType.ENUM('HOTEL', 'APART', 'HOSTEL', 'OTHER'))
    @Column("varchar")
    category?: string;
    //esto se puede reemplazar luego por geolocalizacion
    @Column("varchar")
    @IsNotEmpty()
    country!: string;
    @Column("varchar")
    @IsNotEmpty()
    city!: string;
    @Column("text")
    @IsNotEmpty()
    address!: string;
    @ManyToMany(() => Amenity)
    @JoinTable()
    amenities?: Amenity[];
    @ManyToMany(() => Room)
    @JoinTable()
    rooms?: Room[];
    @ManyToMany(() => MealPlan)
    @JoinTable()
    mealPlans?: MealPlan[];
    @ManyToMany(() => HotelImage)
    @JoinTable()
    images?: HotelImage[];
    @ManyToOne(() => Organization)
    @JoinColumn()
    organization?: Organization;
}
