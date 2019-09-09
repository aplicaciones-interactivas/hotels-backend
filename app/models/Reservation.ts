import {AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Scopes, Table} from "sequelize-typescript";
import {Room} from "./Room";
import {MealPlan} from "./MealPlan";
import {User} from "./User";

@Table
export class Reservation extends Model<Reservation> {

    @BelongsTo(() => Room)
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

    @ForeignKey(() => Room)
    @Column(DataType.BIGINT)
    roomId!: number;

    @ForeignKey(() => MealPlan)
    @Column(DataType.BIGINT)
    mealPlanId!: number;

    @ForeignKey(() => User)
    @Column(DataType.BIGINT)
    userId!: number;


}
