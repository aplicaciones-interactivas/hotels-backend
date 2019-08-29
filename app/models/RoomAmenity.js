const Model = require('sequelize').Model;

class RoomAmenity extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            room_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'room',
                    key: 'id'
                }
            },
            amenity_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'amenity',
                    key: 'id'
                }
            }
        }, {
            tableName: 'room_amenity',
            sequelize
        });
    }
}

module.exports = RoomAmenity;