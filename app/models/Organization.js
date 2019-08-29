const Model = require('sequelize').Model;

class Organization extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            billing_address: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            country: {
                type: DataTypes.STRING(3),
                allowNull: false
            },
            billing_identifier: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            }
        }, {
            tableName: 'organization',
            sequelize
        });
    }
}

module.exports = Organization;


