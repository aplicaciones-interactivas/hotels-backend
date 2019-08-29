const Model = require('sequelize').Model;

class Hotel extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
                id: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: DataTypes.STRING(200),
                    allowNull: false,
                    set: function (name) {
                        if (name) {
                            this.setDataValue('name', name.trim());
                        } else {
                            this.setDataValue('name', null);
                        }
                    },
                    validate: {
                        len: {
                            args: 1
                        }
                    }
                },
                contact_email: {
                    type: DataTypes.STRING(200),
                    allowNull: true
                },
                primary_contact_phone: {
                    type: DataTypes.STRING(50),
                    allowNull: true
                },
                secondary_contact_phone: {
                    type: DataTypes.STRING(50),
                    allowNull: true
                },
                checkin_time: {
                    type: DataTypes.STRING(50),
                    allowNull: true
                },
                checkout_time: {
                    type: DataTypes.STRING(50),
                    allowNull: true
                },
                stars: {
                    type: DataTypes.INTEGER(11),
                    allowNull: true
                },
                category: {
                    type: 'SET(\'HOTEL\',\'APART\',\'HOSTEL\',\'OTHER\')',
                    allowNull: false
                },
                country: {
                    type: DataTypes.STRING(3),
                    allowNull: false
                },
                city: {
                    type: DataTypes.STRING(255),
                    allowNull: false
                },
                address: {
                    type: DataTypes.STRING(255),
                    allowNull: true
                }
            },
            {
                tableName: 'hotels',
                sequelize
            });
    }

    static associate(models) {
      this.amenities = this.belongsToMany(models.amenity, {through: 'hotel_amenity', as:'amenities'});
      this.rooms = this.hasMany(models.rooms, {as: 'rooms'});
      this.mealPlans = this.belongsToMany(models.mealPlans, {through: 'meal_plans'});
      this.images = this.hasMany(models.hotel_images, {as: 'images'});
    }
}

module.exports = Hotel;