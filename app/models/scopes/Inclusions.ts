import {Amenity} from "../Amenity";
import {Bed} from "../Bed";
import {MealPlan} from "../MealPlan";
import {Hotel} from "../Hotel";
import {Organization} from "../Organization";
import {Room} from "../Room";
import {HotelImage} from "../relationship/HotelImage";
import Base = Mocha.reporters.Base;
import {User} from "../User";
import {Role} from "../Role";

const BaseInclusion = {
    through: {attributes: []}
};

export const AmenityInclusion = {
    model: Amenity,
    ...BaseInclusion
};

export const RoomInclusion = {
    model: Room,
    ...BaseInclusion
};

export const HotelImageInclusion = {
    model: HotelImage,
    ...BaseInclusion
}

export const BedInclusion = {
    model: Bed,
    ...BaseInclusion
};

export const HotelInclusion = {
    model: Hotel,
    ...BaseInclusion
};

export const MealPlanInclusion = {
    model: MealPlan,
    ...BaseInclusion
};

export const OrganizationInclusion = {
    model: Organization,
    ...BaseInclusion
}

export const UserInclusion = {
    model: User,
    ...BaseInclusion
}

export const RoleInclusion = {
    model: Role,
    ...BaseInclusion
}