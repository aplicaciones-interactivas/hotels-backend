const Model = require('sequelize').Model;

class HotelImage extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            path: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        }, {
            tableName: 'hotel_image',
            sequelize
        });
    }
}

module.exports = HotelImage;