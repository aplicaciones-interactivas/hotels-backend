class HotelController {
    constructor(hotelService) {
        this.hotelService = hotelService;
    }

    findAll(req, res, next) {
        this.hotelService.findAll(req.query).then((hoteles) => {
            res.send(hoteles);
        });
    }

    findOne(req, res, next) {
        this.hotelService.findOne(req.params.id).then((hotel) => {
            if (hotel === null) {
                res.status(404);
            }
            res.send(hotel);
        });
    }

    create(req, res, next) {
        this.hotelService.create(req.body).then(hotel => {
            res.status(201).json(hotel);
        }).catch(err => {
            res.status(400).json(err);
        });
    }

    delete(req, res, next) {
        this.hotelService.delete(req.params.id).then(() => {
            res.status(204).send();
        }).catch(err => {
            res.status(404).json(err);
        });
    }

    update(req, res, next) {
        this.hotelService.update(req.params.id, req.body).then((hotel) => {
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

module.exports = HotelController;