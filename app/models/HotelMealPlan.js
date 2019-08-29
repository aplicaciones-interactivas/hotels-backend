const Model = require('sequelize').Model;

class HotelMealPlan extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            hotel_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'meal_plan',
                    key: 'id'
                }
            },
            meal_plan_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'hotel',
                    key: 'id'
                }
            }
        }, {
            tableName: 'hotel_meal_plan',
            sequelize
        });
    }
}

module.exports = HotelMealPlan;