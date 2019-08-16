let express = require('express');

class HotelRouter extends express.Router{
    constructor(hotelController) {
        super();
        this.get('/', hotelController.buscarTodos.bind(hotelController));
        this.get('/:id', hotelController.buscarPorId.bind(hotelController));
        this.post('/', hotelController.guardar.bind(hotelController));
        this.delete('/:id', hotelController.borrar.bind(hotelController));
        this.put('/:id', hotelController.actualizar.bind(hotelController));
    }
}
module.exports = HotelRouter;
