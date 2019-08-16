const Hotel = require('../models/Hotel');
const _armarFiltros = Symbol('armarFiltros');

class HotelRepository {
    constructor(sequelize) {
        this.Op = sequelize.Op;
    }
    buscarTodos(filtros) {
        return Hotel.findAll(this[_armarFiltros](filtros || {}));
    }

    guardar(nuevoHotel) {
        return Hotel.create(nuevoHotel);
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