module.exports = function (sequelize, DataTypes) {
    var Hotel = sequelize.define('Hotel', {
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
        amenities: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('amenities').split(',');
            },
            set: function (amenities) {
                this.setDataValue('amenities', amenities.join(','));
            }
        }
    }, {
        timestamps: false
    });
    return Hotel;
};
