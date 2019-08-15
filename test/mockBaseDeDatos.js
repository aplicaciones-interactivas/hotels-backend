const HotelModel = require('../app/models').Hotel;
const data = require('../config/seeders/data/data');

data.forEach(function (hotel) {
    hotel.id = parseInt(hotel.id);
});

module.exports = {
    preparar: () => {
        return HotelModel.truncate().then(() => {
            return HotelModel.bulkCreate(data);
        });
    }
}