const logger = require('../config/LoggerConfiguration').create('HotelService');

class HotelService {
    constructor(hotelRepository) {
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
        this.hotelRepository = hotelRepository;
    }

    buscarTodos(filtros) {
        return this.hotelRepository.buscarTodos(filtros);
    }

    guardar(nuevoHotel) {
        logger.info('Guardando hotel '+ JSON.stringify(nuevoHotel));
        nuevoHotel.id = null;
        return this.hotelRepository.guardar(nuevoHotel)
            .catch((err) => {
                logger.error(err.toString());
                throw err;
            });
    }

    buscarPorId(id) {
        return this.hotelRepository.buscarPorId(id);
    }

    actualizar(id, nuevoHotel) {
        return this.hotelRepository.actualizar(id, nuevoHotel)
            .catch((err) => {
                logger.error(err.toString());
                throw err;
            });
    }

    borrar(id) {
        return this.hotelRepository.borrar(id)
            .then((cantidadBorrados) => {
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
}


module.exports = HotelService;