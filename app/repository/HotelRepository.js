const Hotel = require('../models/Hotel');
const Amenity = require('../models/Amenity');
const EntityNotFoundError = require('../exception/EntityNotFoundError');
const ValidationError = require('../exception/ValidationError');
const _armarFiltros = Symbol('armarFiltros');
const _crearRelacionConAmenities = Symbol('crearRelacionConAmenities');
const Sequelize = require('sequelize');

//TODO: Cambiar SQLite por un Docker con Mysql y poner txs, por bug con sqlite, no soporta correctamente las txs
class HotelRepository {
    constructor(sequelize) {
        this.Op = sequelize.Op;
    }

    findAll(filtros) {
        let options = this[_armarFiltros](filtros || {});
        options.include = [
            {model: Amenity, as: 'amenities'}
        ];
        return Hotel.findAll(options);
    }

    create(nuevoHotel) {
        return this.handleHotelPromise(Hotel.create(nuevoHotel), nuevoHotel);
    }

    update(id, nuevoHotel) {
        return this.handleHotelPromise(Hotel.update(nuevoHotel, {where: {id: id}}).then(() => Hotel.findByPk(id, {rejectOnEmpty: true})), nuevoHotel);
    }

    handleHotelPromise(promise, nuevoHotel) {
        const optsAmenities = {
            where: {}
        };
        const optsHotel = {include: [{model: Amenity, as: 'amenities'}]};
        return promise.catch(this.handleSequelizeError).then(hotel => {
            let amenities = null;
            if (nuevoHotel.amenities) {
                optsAmenities.where.id = nuevoHotel.amenities;
                amenities = Amenity.findAll(optsAmenities)
                    .then(amenities => this[_crearRelacionConAmenities](hotel, amenities));
            }
            return Promise.all([amenities]).then(() => hotel);
        }).then(hotel => Hotel.findByPk(hotel.id, optsHotel));
    }

    handleSequelizeError(error) {
        if (error instanceof Sequelize.ValidationError) {
            throw new ValidationError('El nombre del hotel es invalido');
        }
        if (error instanceof Sequelize.EmptyResultError) {
            throw new EntityNotFoundError('El hotel indicado no se encontro');
        }
    }

    [_crearRelacionConAmenities](hotel, amenities) {
        if (!(amenities && amenities.length === 0)) {
            return hotel.addAmenities(amenities);
        }
        throw new EntityNotFoundError('Alguno de los amenities indicados no existe');
    }

    findOne(id) {
        return Hotel.findByPk(id);
    }

    delete(id) {
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