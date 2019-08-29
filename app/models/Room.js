const Model = require('sequelize').Model;

class Room extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: "SET('SINGLE','DOUBLE','TRIPLE','QUAD','QUEEN','KING','DOUBLE_DOUBLE','STUDIO','SUITE','MASTER_SUITE','JUNIOR_SUITE')",
                allowNull: false
            },
            max_ocupancy: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            surface_area: {
                type: "DOUBLE",
                allowNull: true
            },
            guests: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            },
            hotel_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'hotel',
                    key: 'id'
                }
            }
        }, {
            tableName: 'room',
            sequelize
        });
    }

    static associate(models) {
        this.amenities = this.belongsToMany(models.amenity, {through: 'room_amenity', as:'amenities'});
        this.beds = this.belongsToMany(models.bed, {through: 'room_bed', as:'beds'});
    }


}

module.exports = Room;