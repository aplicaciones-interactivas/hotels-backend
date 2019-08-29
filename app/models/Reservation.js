const Model = require('sequelize').Model;

class Reservation extends Model {
    static init(sequelize, DataTypes) {
        return super.init( {
            room_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            from: {
                type: DataTypes.DATE,
                allowNull: false
            },
            until: {
                type: DataTypes.DATE,
                allowNull: false
            },
            meal_plan_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'meal_plan',
                    key: 'id'
                }
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            }
        }, {
            tableName: 'reservation',
            sequelize
        });
    }
}

module.exports = Reservation;