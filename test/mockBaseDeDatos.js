const Hotel = require('../app/models/Hotel');
const Amenity = require('../app/models/Amenity');
const dataHotel = require('../config/seeders/data/data-hotels');
const dataAmenity = require('../config/seeders/data/data-amenities');
const db = require('../app/models/index');

module.exports = {
    preparar: async () => {
        await db.sequelize.sync();
        await Amenity.truncate().then(() => {
            Amenity.bulkCreate(dataAmenity);
        });
        await Hotel.truncate().then(() => {
            Hotel.bulkCreate(dataHotel, {include: {model: Amenity, as: 'amenities'}});
        });
    }
}