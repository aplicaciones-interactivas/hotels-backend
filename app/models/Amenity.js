const Model = require('sequelize').Model;

class Amenity extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            code: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                set: function (name) {
                    this.setDataValue('name', name.trim());
                },
                allowNull: false,
                validate: {
                    len: {
                        args: 1,
                        msg: 'El nombre de la comodidad no puede estar vacio'
                    }
                }
            }
        }, {
            tableName: 'amenities',
            sequelize
        });
    }
}

module.exports = Amenity;