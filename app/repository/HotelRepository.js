const Hotel = require('../models/Hotel');
const Amenity = require('../models/Amenity');
const _armarFiltros = Symbol('armarFiltros');

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

    async guardar(nuevoHotel) {

        return new Promise((resolve, reject) => {
            let hotel = Hotel.create(nuevoHotel);
            let amenities = null;
            if (nuevoHotel.amenities) {
                amenities = Amenity.findAll({where: {id: nuevoHotel.amenities}});
            }
            Promise.all([amenities]).then(sAmenities => hotel.then(hotel => hotel.addAmenities(sAmenities[0])).then(() => hotel)
                .then(hotel => Hotel.findByPk(hotel.id, {include: [{model: Amenity, as: 'amenities'}]})))
                .then(resolve)
                .catch(reject);
        });
     /*   return new Promise((resolve, reject) => {
            Amenity.findAll({where: {id: nuevoHotel.amenities}})
                .then(sAmenities => hotel.then(hotel => hotel.addAmenities(sAmenities)).then(() => hotel)
                    .then(hotel => Hotel.findByPk(hotel.id, {include: [{model: Amenity, as: 'amenities'}]}))
                    .then(resolve).catch(reject));
        });
*/
        /*
          const body = req.body
    const tags = body.tags.map(tag => Tag.findOrCreate({ where: { name: tag.name }, defaults: { name: tag.name }})
                                         .spread((tag, created) => tag))
    User.findById(body.userId)
        .then(() => Blog.create(body))
        .then(blog => Promise.all(tags).then(storedTags => blog.addTags(storedTags)).then(() => blog))
        .then(blog => Blog.findOne({ where: {id: blog.id}, include: [User, Tag]}))
        .then(blogWithAssociations => res.json(blogWithAssociations))
        .catch(err => res.status(400).json({ err: `User with id = [${body.userId}] doesn\'t exist.`}))
         */
    }

    buscarPorId(id) {
        return Hotel.findByPk(id);
    }

    actualizar(id, nuevoHotel) {
        return Hotel.update(nuevoHotel, {
            where: {
                id: id
            }
        });
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