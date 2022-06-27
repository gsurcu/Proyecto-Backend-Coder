const express = require('express')
const { crearCarritoController, eliminarCarritoController, listarCarritoController, agregarProdCarritoController, eliminarProdCarritoController } = require('../../../controllers/carts.controllers.js');

const router = express.Router();

router.post('/', crearCarritoController);

router.delete('/:id', eliminarCarritoController);

router.get('/:id/productos', listarCarritoController);

router.post('/:id/productos/:id_prod', agregarProdCarritoController);

router.delete('/:id/productos/:id_prod', eliminarProdCarritoController);

module.exports = router;