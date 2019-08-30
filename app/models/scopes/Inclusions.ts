import {Amenity} from "../Amenity";
import {Bed} from "../Bed";
import {MealPlan} from "../MealPlan";
import {Hotel} from "../Hotel";
import {Organization} from "../Organization";

const BaseInclusion = {
    through: {attributes: []}
};

export const AmenityInclusion = {
    model: Amenity,
    ...BaseInclusion
};

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

