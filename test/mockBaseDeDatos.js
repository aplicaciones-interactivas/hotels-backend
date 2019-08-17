const HotelModel = require('../app/models/Hotel');
const data = require('../config/seeders/data/data');
const db = require('../app/models/index');

data.forEach(function (hotel) {
    hotel.id = parseInt(hotel.id);
});

module.exports = {
    preparar: async () => {
        await db.sequelize.sync();
        return await HotelModel.truncate().then(() => {
            return HotelModel.bulkCreate(data);
        });
    }
}