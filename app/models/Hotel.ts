import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    IsEmail,
    Model,
    PrimaryKey, Scopes
} from "sequelize-typescript";
import {Amenity} from './Amenity';
import {HotelAmenity} from "./relationship/HotelAmenity";
import {Room} from "./Room";
import {MealPlan} from "./MealPlan";
import {MealPlanHotel} from "./relationship/MealPlanHotel";
import {RoomHotel} from "./relationship/RoomHotel";
import {HotelImage} from "./relationship/HotelImage";

@Scopes(() => ({

}))
export class Hotel extends Model<Hotel> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!:number;
    @Column(DataType.STRING(255))
    @AllowNull(false)
    name!: string;
    @Column(DataType.STRING(255))
    @IsEmail
    contactEmail?: string;
    @Column(DataType.STRING(30))
    primaryContactPhone? : string;
    @Column(DataType.STRING(30))
    secondaryContactPhone?: string;
    @Column(DataType.TIME)
    checkinTime?: Date;
    @Column(DataType.TIME)
    checkoutTime?: Date;
    @Column(DataType.INTEGER)
    stars?: number;
    @Column(DataType.ENUM('HOTEL','APART','HOSTEL','OTHER'))
    category? : string;
    //esto se puede reemplazar luego por geolocalizacion
    @Column(DataType.STRING(50))
    @AllowNull(false)
    country!: string;
    @Column(DataType.STRING(50))
    @AllowNull(false)
    city!: string;
    @Column(DataType.TEXT)
    @AllowNull(false)
    address!: string;
    @BelongsToMany(() => Amenity, () => HotelAmenity)
    amenities?: Amenity[];
    @BelongsToMany(() => Room, () => RoomHotel)
    rooms?: Room[];
    @BelongsToMany(() => MealPlan, () => MealPlanHotel)
    mealPlans?: MealPlan[];
    @HasMany(() => HotelImage)
    images?: HotelImage[];
}