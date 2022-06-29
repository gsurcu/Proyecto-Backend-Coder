const express = require('express')
const ProductsController = require('../../../controllers/products.controllers')
const router = express.Router();

class ProductsRouter {
  constructor() {
    this.productsController = new ProductsController()
  }
  start() {
    router.get('/:id?', this.productsController.read);
    router.post('/', this.productsController.create);
    router.put('/:id', this.productsController.update);
    router.delete('/:id', this.productsController.delete);
    router.get('/:categoria' , this.productsController.readByCategory)
    return router
  }
}

module.exports = ProductsRouter;