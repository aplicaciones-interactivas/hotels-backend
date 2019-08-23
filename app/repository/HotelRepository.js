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
        return this.handleHotelPromise(Hotel.create(nuevoHotel), nuevoHotel);
    }

    actualizar(id, nuevoHotel) {
        return this.handleHotelPromise(Hotel.update(nuevoHotel, {where: {id: id}}).then(() => Hotel.findByPk(id)), nuevoHotel);
    }

    handleHotelPromise(promise, nuevoHotel) {
        const optsAmenities = {
            where: {}
        };
        const optsHotel = {include: [{model: Amenity, as: 'amenities'}]};
        return promise.catch(this.handleSequelizeError).then(hotel => {
            let amenities = null;
            if(nuevoHotel.amenities) {
                optsAmenities.where.id = nuevoHotel.amenities;
                amenities = Amenity.findAll(optsAmenities)
                    .then(amenities => this[_crearRelacionConAmenities](hotel, amenities));
            }
            return Promise.all([amenities]).then(() => hotel);
        }).then(hotel => Hotel.findByPk(hotel.id, optsHotel));
    }

    handleSequelizeError(error) {
        if(error.errors[0].constructor.name === 'ValidationErrorItem' && error.errors[0].path === 'name') {
            throw new ValidationError('El nombre del hotel es invalido');
        }
    }

    abc(n, h){
        let amenities = null;
        if (n.amenities) {
            amenities = Amenity.findAll({where: {id: n.amenities}});
        }
        return Promise.all([amenities])
            .then(sAmenities => this[_crearRelacionConAmenities](h, amenities))
            .then(() => h);
    }
    /*actualizar(id, nuevoHotel) {
        const options = {include: [{model: Amenity, as: 'amenities'}]};
        return Hotel.update(nuevoHotel, {where: {id: id}})
            .then(h => Hotel.findByPk(id))
            .then(h => this.abc(nuevoHotel, h))
            .then(() => Hotel.findByPk(id, options));
    }*/
    [_crearRelacionConAmenities](hotel, amenities) {
        if(!(amenities && amenities.length === 0)) {
            return hotel.addAmenities(amenities);
        }
        throw new EntityNotFoundError('Alguno de los amenities indicados no existe');
    }

    buscarPorId(id) {
        return Hotel.findByPk(id);
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