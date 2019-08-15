const HotelModel = require('../models').Hotel;
const Op = require('sequelize').Op;

module.exports = (function () {

    let errorIdNoExiste = {
        codigo: 1,
        descripcion: 'El id a borrar no existe'
    };
    let errorIdNoIndicado = {
        codigo: 3,
        descripcion: 'Indique el id del hotel'
    };
    let errorNombreNoIndicado = {
        codigo: 2,
        descripcion: 'Indique el nombre del hotel'
    };


    function armarFiltros(filtros) {
        var where = {};

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

    function buscarTodos(filtros) {
        return HotelModel.findAll(armarFiltros(filtros || {}));
    }

    function guardar(nuevoHotel) {
        nuevoHotel.id = null;
        return HotelModel.create(nuevoHotel).catch((err) => {
            throw errorNombreNoIndicado;
        }).then((hotel) => {
            return new Promise((resolve, reject) => {
                resolve(hotel);
            });
        });
    }

    function buscarPorId(id) {
        return HotelModel.findByPk(id);
    }

    function borrar(id) {
        return HotelModel.destroy({
            where: {
                id: id
            }
        }).then((cantidadBorrados) => {
            if (!id) {
                throw errorIdNoIndicado;
            } else if (!cantidadBorrados) {
                throw errorIdNoExiste;
            } else {
                return new Promise((resolve, reject) => {
                    resolve(cantidadBorrados);
                });
            }
        });
    }

    function actualizar(id, nuevoHotel) {
        return HotelModel.update(nuevoHotel, {
            where: {
                id: id
            }
        }).catch((err) => {
            throw errorNombreNoIndicado;
        }).then((hotelActualizado) => {
            if (hotelActualizado[0] !== 0) {
                return buscarPorId(id);
            } else {
                throw errorIdNoExiste;
            }
        });
    }

    return {
        buscarTodos: buscarTodos,
        guardar: guardar,
        buscarPorId: buscarPorId,
        borrar: borrar,
        actualizar: actualizar
    };

})();