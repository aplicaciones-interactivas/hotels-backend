import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey} from "sequelize-typescript";

export class MealPlan extends Model<MealPlan> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id!: number;
    @Column(DataType.STRING(255))
    @AllowNull(false)
    name!: string;
    @Column(DataType.TEXT)
    @AllowNull(false)
    description!: string;
    @Column(DataType.STRING(2))
    @AllowNull(false)
    code!: string;

}