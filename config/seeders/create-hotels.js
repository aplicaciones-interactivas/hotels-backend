var dataHotels = require('./data/data-hotels');
dataHotels.forEach(function (hotel) {
    hotel.id = parseInt(hotel.id);
});

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.dropTable('Hotels');
        queryInterface.createTable('Hotels', {
            id: {
                type: Sequelize.INTEGER, primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: Sequelize.STRING,
            stars: Sequelize.INTEGER,
            amenities: Sequelize.STRING
        });
        return queryInterface.bulkInsert('Hotels', dataHotels);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface
            .dropTable('Hotels');
    }
}
