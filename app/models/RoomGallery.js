const Model = require('sequelize').Model;

//Revisar si nos hace falta esta entidad... ¿Las habitaciones pueden tener imagenes?
class RoomGallery extends Model {
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
            image_url: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, {
            tableName: 'room_gallery',
            sequelize
        });
    }
}

module.exports = RoomGallery;