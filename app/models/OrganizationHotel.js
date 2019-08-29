const Model = require('sequelize').Model;

class OrganizationHotel extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            organization_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'organization',
                    key: 'id'
                }
            },
            hotel_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'hotel',
                    key: 'id'
                }
            }
        }, {
            tableName: 'organization_hotel',
            sequelize
        });
    }
}

module.exports = OrganizationHotel;


