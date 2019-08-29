const Model = require('sequelize').Model;

class HotelGallery extends Model {
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
            image_url: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, {
            tableName: 'hotel_gallery',
            sequelize
        });
    }
}

module.exports = HotelGallery;