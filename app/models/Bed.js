const Model = require('sequelize').Model;

class Bed extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            code: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        }, {
            tableName: 'bed',
            sequelize
        });
    }
}

module.exports = Bed;