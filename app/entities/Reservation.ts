import {Room} from "./Room";
import {MealPlan} from "./MealPlan";
import {User} from "./User";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Room)
    room!: Room;
    @Column("datetime")
    @IsNotEmpty()
    from!: Date;
    @Column("datetime")
    @IsNotEmpty()
    until!: Date;
    @ManyToOne(() => MealPlan)
    @JoinColumn()
    mealPlan?: MealPlan;
    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

}
