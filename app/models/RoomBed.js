const Model = require('sequelize').Model;

class RoomBed extends Model {
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
            bed_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'bed',
                    key: 'id'
                }
            }
        }, {
            tableName: 'room_bed',
            sequelize
        });
    }
}

module.exports = RoomBed;