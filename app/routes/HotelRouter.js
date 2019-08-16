let express = require('express');

class HotelRouter extends express.Router{
    constructor(hotelController) {
        super();
        this.get('/', hotelController.buscarTodos);
        this.get('/:id', hotelController.buscarPorId);
        this.post('/', hotelController.guardar);
        this.delete('/:id', hotelController.borrar);
        this.put('/:id', hotelController.actualizar);
    }
}


module.exports = HotelRouter;
