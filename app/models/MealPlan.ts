import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey} from "sequelize-typescript";

export class MealPlan extends Model<MealPlan> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;
    @AllowNull(false)
    @Column(DataType.STRING(255))
    name!: string;
    @AllowNull(false)
    @Column(DataType.TEXT)
    description!: string;
    @AllowNull(false)
    @Column(DataType.STRING(2))
    code!: string;

}
