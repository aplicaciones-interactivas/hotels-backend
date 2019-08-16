const Hotel = require('../models/Hotel');
const Op = require('sequelize').Op;
const _armarFiltros = Symbol('armarFiltros');

class HotelService {
    constructor() {
        this.errors = {
            errorIdNoExiste: {
                codigo: 1,
                descripcion: 'El id a borrar no existe'
            },
            errorIdNoIndicado: {
                codigo: 3,
                descripcion: 'Indique el id del hotel'
            },
            errorNombreNoIndicado: {
                codigo: 2,
                descripcion: 'Indique el nombre del hotel'
            }
        };
    }

    buscarTodos(filtros) {
        return Hotel.findAll(this[_armarFiltros](filtros || {}));
    }
    guardar(nuevoHotel) {
        nuevoHotel.id = null;
        return Hotel.create(nuevoHotel).catch((err) => {
            throw this.errors.errorNombreNoIndicado;
        }).then((hotel) => {
            return new Promise((resolve, reject) => {
                resolve(hotel);
            });
        });
    }

    buscarPorId(id) {
        return Hotel.findByPk(id);
    }

    actualizar(id, nuevoHotel) {
        return Hotel.update(nuevoHotel, {
            where: {
                id: id
            }
        }).catch((err) => {
            throw this.errors.errorNombreNoIndicado;
        }).then((hotelActualizado) => {
            if (hotelActualizado[0] !== 0) {
                return this.buscarPorId(id);
            } else {
                throw this.errors.errorIdNoExiste;
            }
        });
    }
    borrar(id) {
        return Hotel.destroy({
            where: {
                id: id
            }
        }).then((cantidadBorrados) => {
            if (!id) {
                throw this.errors.errorIdNoIndicado;
            } else if (!cantidadBorrados) {
                throw this.errors.errorIdNoExiste;
            } else {
                return new Promise((resolve, reject) => {
                    resolve(cantidadBorrados);
                });
            }
        });
    }
    [_armarFiltros](filtros) {
        let where = {};

        if (filtros.estrellas && filtros.estrellas.length !== 0) {
            where.stars = filtros.estrellas;
        }
        if (filtros.nombre) {
            where.name = {[Op.like]: '%' + filtros.nombre + '%'};
        }

        if (Object.keys(where).length !== 0) {
            return {where: where};
        } else {
            return {};
        }
    }
}


module.exports = HotelService;