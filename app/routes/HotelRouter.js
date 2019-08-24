let express = require('express');

class HotelRouter extends express.Router{
    constructor(hotelController) {
        super();
        this.get('/', hotelController.findAll.bind(hotelController));
        this.get('/:id', hotelController.findOne.bind(hotelController));
        this.post('/', hotelController.create.bind(hotelController));
        this.delete('/:id', hotelController.delete.bind(hotelController));
        this.put('/:id', hotelController.update.bind(hotelController));
    }
}
module.exports = HotelRouter;
