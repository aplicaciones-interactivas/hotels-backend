const Model = require('sequelize').Model;

class Room extends Model {
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
                        if(name===null){
                            this.setDataValue('name', null);
                        }else{
                            this.setDataValue('name', name.trim());
                        }
                    },
                    allowNull: false,
                    validate: {
                        len: {
                            args: 1
                        }
                    }
                },
                type: {
                    type: DataTypes.STRING,
                },
                bed_type: {
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
                tableName: 'rooms',
                sequelize
            });
    }
    static associate(models) {
        //this.amenities = this.belongsToMany(models.amenity, {through: 'hotel_amenity', as:'amenities'});
    }
}

module.exports = Room;