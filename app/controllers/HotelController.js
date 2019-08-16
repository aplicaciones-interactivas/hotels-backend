class HotelController {
    constructor(hotelService) {
        this.hotelService = hotelService;
    }

    buscarTodos(req, res, next) {
        this.hotelService.buscarTodos(req.query).then((hoteles) => {
            res.send(hoteles);
        });
    }

    buscarPorId(req, res, next) {
        this.hotelService.buscarPorId(req.params.id).then((hotel) => {
            if (hotel === null) {
                res.status(404);
            }
            res.send(hotel);
        });
    }

    guardar(req, res, next) {
        this.hotelService.guardar(req.body).then(hotel => {
            res.status(201).json(hotel);
        }).catch(err => {
            res.status(400).json(err);
        });
    }

    borrar(req, res, next) {
        this.hotelService.borrar(req.params.id).then(() => {
            res.status(204).send();
        }).catch(err => {
            res.status(404).json(err);
        });
    }

    actualizar(req, res, next) {
        this.hotelService.actualizar(req.params.id, req.body).then((hotel) => {
            res.status(200).json(hotel);
        }).catch((err) => {
            if (err.codigo === 1) {
                res.status(404).json(err.descripcion);
            } else {
                res.status(400).json(err.descripcion);
            }
        });
    }
}

module.exports=HotelController;