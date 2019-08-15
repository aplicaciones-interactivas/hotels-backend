let hotelService = require('../service/HotelService');

module.exports = {
    buscarTodos: (req, res, next) => {
        hotelService.buscarTodos(req.query).then((hoteles) => {
            res.send(hoteles);
        });
    },
    buscarPorId: (req, res, next) => {
        hotelService.buscarPorId(req.params.id).then((hotel) => {
            if (hotel === null) {
                res.status(404);
            }
            res.send(hotel);
        });
    },
    guardar: (req, res, next) => {
        hotelService.guardar(req.body).then(hotel => {
            res.status(201).json(hotel);
        }).catch(err => {
            res.status(400).json(err);
        });
    },
    borrar: (req, res, next) => {
        hotelService.borrar(req.params.id).then(() => {
            res.status(204).send();
        }).catch(err => {
            res.status(404).json(err);
        });
    },
    actualizar: (req, res, next) => {
        hotelService.actualizar(req.params.id, req.body).then((hotel) => {
            res.status(200).json(hotel);
        }).catch((err) => {
            if (err.codigo === 1) {
                res.status(404).json(err.descripcion);
            } else {
                res.status(400).json(err.descripcion);
            }
        });
    }
};
