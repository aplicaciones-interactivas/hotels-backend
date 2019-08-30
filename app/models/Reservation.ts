import {AllowNull, BelongsTo, Column, DataType, Model} from "sequelize-typescript";
import {Room} from "./Room";
import {MealPlan} from "./MealPlan";
import {User} from "./User";

export class Reservation extends Model<Reservation> {

    @BelongsTo(() => Room)
    @AllowNull(false)
    room!: Room;
    @Column(DataType.DATE)
    @AllowNull(false)
    from!: Date;
    @Column(DataType.DATE)
    @AllowNull(false)
    until!: Date;
    @BelongsTo(()=> MealPlan)
    mealPlan?: MealPlan;
    @BelongsTo(()=> User)
    user!: User;

}
