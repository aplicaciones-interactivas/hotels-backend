const Model = require('sequelize').Model;

class MealPlan extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            code: {
                type: DataTypes.STRING(2),
                allowNull: false
            }
        }, {
            tableName: 'meal_plan',
            sequelize
        });
    }
}

module.exports = MealPlan;