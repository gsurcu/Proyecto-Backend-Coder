const express = require('express')
const CartsController = require('../../../controllers/carts.controllers.js');
const router = express.Router();

class CartsRouter {
  constructor() {
    this.cartsController = new CartsController();
  }

  start() {
    router.post('/', this.cartsController.createCart);
    router.delete('/:id', this.cartsController.deleteCart);
    router.get('/:id/productos', this.cartsController.listCart);
    router.post('/:id/productos/:id_prod', this.cartsController.addProd);
    router.delete('/:id/productos/:id_prod', this.cartsController.deleteProd);

    return router
  }
}


module.exports = CartsRouter;