const Model = require('sequelize').Model;

class Hotel extends Model {
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
                            msg: 'El nombre del hotel no puede estar vacio'
                        }
                    }
                },
                stars: {
                    type: DataTypes.INTEGER,
                    defaultValue: 1
                },
                address: {
                    type: DataTypes.STRING
                },
                contact_email: {
                    type: DataTypes.STRING,
                    validate: {
                        isEmail: true
                    }
                },
                contact_phone: {
                    type: DataTypes.STRING
                }

            },
            {
                tableName: 'hotels',
                sequelize
            });
    }
}

module.exports = Hotel;