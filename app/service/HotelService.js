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

    findAll(filtros) {
        return this.hotelRepository.findAll(filtros);
    }

    create(nuevoHotel) {
        logger.info('Guardando hotel '+ JSON.stringify(nuevoHotel));
        nuevoHotel.id = null;
        return this.hotelRepository.create(nuevoHotel)
            .catch((err) => {
                logger.error(err.toString());
                throw err;
            });
    }

    findOne(id) {
        return this.hotelRepository.findOne(id);
    }

    update(id, nuevoHotel) {
        return this.hotelRepository.update(id, nuevoHotel)
            .catch((err) => {
                logger.error(err.toString());
                throw err;
            });
    }

    delete(id) {
        return this.hotelRepository.delete(id)
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