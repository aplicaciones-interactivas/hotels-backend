import {AllowNull, BelongsTo, Column, DataType, Model} from "sequelize-typescript";
import {Room} from "./Room";
import {MealPlan} from "./MealPlan";
import {User} from "./User";

export class Reservation extends Model<Reservation> {

    @BelongsTo(() => Room)
    @AllowNull(false)
    room!: Room;
    @AllowNull(false)
    @Column(DataType.DATE)
    from!: Date;
    @AllowNull(false)
    @Column(DataType.DATE)
    until!: Date;
    @BelongsTo(()=> MealPlan)
    mealPlan?: MealPlan;
    @BelongsTo(()=> User)
    user!: User;

}
