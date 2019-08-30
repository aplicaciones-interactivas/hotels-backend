import {Column, DataType, ForeignKey, Model} from "sequelize-typescript";
import {Hotel} from "../Hotel";
import {MealPlan} from "../MealPlan";

export class MealPlanHotel extends Model<MealPlanHotel> {
    @ForeignKey(() => Hotel)
    @Column(DataType.BIGINT)
    hotelId!: number;
    @ForeignKey(() => MealPlan)
    @Column(DataType.BIGINT)
    mealPlanId!: number;
}