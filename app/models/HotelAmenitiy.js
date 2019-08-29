const Model = require('sequelize').Model;

class HotelAmenitiy extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            hotel_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'hotel',
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
            tableName: 'hotel_amenity',
            sequelize
        });
    }
}

module.exports = HotelAmenitiy;