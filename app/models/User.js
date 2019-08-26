const Model = require('sequelize').Model;

class User extends Model {
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
                Genre: {
                    type: DataTypes.STRING
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
                },
                birth_date: {
                  type: DataTypes.DATE
                }
            },
            {
                tableName: 'users',
                sequelize
            });
    }
    static associate(models) {
        //this.amenities = this.belongsToMany(models.amenity, {through: 'hotel_amenity', as:'amenities'});
    }
}

module.exports = User;