const Hotel = require('../models/Hotel');
const Amenity = require('../models/Amenity');
const EntityNotFoundError = require('../exception/EntityNotFoundError');
const ValidationError = require('../exception/ValidationError');
const _armarFiltros = Symbol('armarFiltros');
const _crearRelacionConAmenities = Symbol('crearRelacionConAmenities');
class HotelRepository {
    constructor(sequelize) {
        this.Op = sequelize.Op;
    }

    buscarTodos(filtros) {
        let options = this[_armarFiltros](filtros || {});
        options.include = [
            {model: Amenity, as: 'amenities'}
        ];
        return Hotel.findAll(options);
    }

    guardar(nuevoHotel) {
        let hotel = Hotel.create(nuevoHotel);
        let amenities = null;
        if (nuevoHotel.amenities) {
            amenities = Amenity.findAll({where: {id: nuevoHotel.amenities}});
        }
        const options = {include: [{model: Amenity, as: 'amenities'}]};
        return Promise.all([amenities]).then(sAmenities => this[_crearRelacionConAmenities](hotel, sAmenities[0])
            .then(() => hotel)
            .then(hotel => Hotel.findByPk(hotel.id, options))
            .catch(error => {
                if(error.errors[0].constructor.name === 'ValidationErrorItem' && error.errors[0].path === 'name') {
                    throw new ValidationError('El nombre del hotel es invalido');
                }
            }));
    }

    [_crearRelacionConAmenities](hotel, amenities) {
        if(!(amenities && amenities.length === 0)) {
            return hotel.then(hotel => hotel.addAmenities(amenities));
        }
        throw new EntityNotFoundError('Alguno de los amenities indicados no existe');
    }

    buscarPorId(id) {
        return Hotel.findByPk(id);
    }

    actualizar(id, nuevoHotel) {
        let amenities = null;
        const options = {include: [{model: Amenity, as: 'amenities'}]};
        return Hotel.update(nuevoHotel, {where: {id: id}})
            .then(result => Hotel.findByPk(id))
            .then(h => {
                if (nuevoHotel.amenities) {
                    amenities = Amenity.findAll({where: {id: nuevoHotel.amenities}});
                }
                return Promise.all([amenities]).then(sAmenities => h.addAmenities(sAmenities[0])).then(() => h);
            }).then(hotel => Hotel.findByPk(hotel.id, options));
    }

    borrar(id) {
        return Hotel.destroy({
            where: {
                id: id
            }
        });
    }

    [_armarFiltros](filtros) {
        let where = {};

        if (filtros.estrellas && filtros.estrellas.length !== 0) {
            where.stars = filtros.estrellas;
        }
        if (filtros.nombre) {
            where.name = {[this.Op.like]: '%' + filtros.nombre + '%'};
        }

        if (Object.keys(where).length !== 0) {
            return {where: where};
        } else {
            return {};
        }
    }
}

module.exports = HotelRepository;