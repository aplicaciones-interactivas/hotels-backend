const Model = require('sequelize').Model;

class UserRole extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            role: {
                type: "SET('USER','ADMIN')",
                allowNull: true
            }
        }, {
            tableName: 'user_role',
            sequelize
        });
    }
}

module.exports = UserRole;