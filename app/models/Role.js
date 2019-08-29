const Model = require('sequelize').Model;

class Role extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            role_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            }
        }, {
            tableName: 'role',
            sequelize
        });

    }
}

module.exports = Role;