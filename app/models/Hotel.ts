import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType, ForeignKey,
    HasMany,
    IsEmail,
    Model,
    PrimaryKey, Scopes, Table
} from "sequelize-typescript";
import {Amenity} from './Amenity';
import {HotelAmenity} from "./relationship/HotelAmenity";
import {Room} from "./Room";
import {MealPlan} from "./MealPlan";
import {MealPlanHotel} from "./relationship/MealPlanHotel";
import {RoomHotel} from "./relationship/RoomHotel";
import {HotelImage} from "./relationship/HotelImage";
import {Organization} from "./Organization";
import {AmenityInclusion, HotelImageInclusion, RoomInclusion} from "./scopes/Inclusions";

@Scopes(() => ({
    withAmenities: {
        include: [AmenityInclusion]
    },
    withRooms: {
        include: [RoomInclusion]
    },
    withMealPlans: {
        include: [MealPlan]
    },
    withImage: {
        include: [HotelImageInclusion]
    },
    withAll: {
        include: [AmenityInclusion, RoomInclusion, MealPlan, HotelImageInclusion]
    }
}))
@Table
export class Hotel extends Model<Hotel> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;
    @AllowNull(false)
    @Column(DataType.STRING(255))
    name!: string;
    @IsEmail
    @Column(DataType.STRING(255))
    contactEmail?: string;
    @Column(DataType.STRING(30))
    primaryContactPhone?: string;
    @Column(DataType.STRING(30))
    secondaryContactPhone?: string;
    @Column(DataType.TIME)
    checkinTime?: Date;
    @Column(DataType.TIME)
    checkoutTime?: Date;
    @Column(DataType.INTEGER)
    stars?: number;
    @Column(DataType.ENUM('HOTEL', 'APART', 'HOSTEL', 'OTHER'))
    category?: string;
    //esto se puede reemplazar luego por geolocalizacion
    @AllowNull(false)
    @Column(DataType.STRING(50))
    country!: string;
    @AllowNull(false)
    @Column(DataType.STRING(50))
    city!: string;
    @AllowNull(false)
    @Column(DataType.TEXT)
    address!: string;
    @BelongsToMany(() => Amenity, () => HotelAmenity)
    amenities?: Amenity[];
    @BelongsToMany(() => Room, () => RoomHotel)
    rooms?: Room[];
    @BelongsToMany(() => MealPlan, () => MealPlanHotel)
    mealPlans?: MealPlan[];
    @HasMany(() => HotelImage)
    images?: HotelImage[];
    @AllowNull(false)
    @ForeignKey(()=> Organization)
    @Column(DataType.BIGINT)
    organizationId?: number;
}
