const Model = require('sequelize').Model;

class User extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            organization_id: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'organization',
                    key: 'id'
                }
            }
        }, {
            tableName: 'user',
            sequelize
        });
    }
    static associate(models) {
        this.reservations = this.hasMany(models.reservation, {as:'reservations'});
        this.roles = this.belongsToMany(models.role, {through: 'user_role', as: 'roles'});
    }
}

module.exports = User;