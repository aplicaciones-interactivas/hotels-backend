let express = require('express');
let router = express.Router();
let hotelController = require('../controllers/hotelController');

router.get('/', hotelController.buscarTodos);
router.get('/:id', hotelController.buscarPorId);
router.post('/', hotelController.guardar);
router.delete('/:id', hotelController.borrar);
router.put('/:id', hotelController.actualizar);
module.exports = router;
