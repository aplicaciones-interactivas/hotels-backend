const Model = require('sequelize').Model;

class Amenity extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
                name: {
                    type: DataTypes.STRING,
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
                },
                icon: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                tableName: 'amenities',
                sequelize
            });
    }
}

module.exports = Amenity;