import {SimpleBaseRepository} from "./generics/SimpleBaseRepository";
import {MealPlan} from "../models/MealPlan";

export class MealPlanRepository extends SimpleBaseRepository<MealPlan> {
    constructor() {
        super(MealPlan);
    }
}