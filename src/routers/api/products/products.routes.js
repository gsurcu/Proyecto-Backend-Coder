const express = require('express')
const ProductsController = require('../../../controllers/productos.controllers')
const router = express.Router();

class ProductsRouter {
  constructor() {
    this.productsController = new ProductsController()
  }
  start() {
    router.get('/:id?', this.productsController.list);
    router.post('/', this.productsController.create);
    router.put('/:id', this.productsController.update);
    router.delete('/:id', this.productsController.delete);
    return router
  }
}

module.exports = ProductsRouter;