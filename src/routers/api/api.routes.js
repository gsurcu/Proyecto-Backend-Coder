const express = require('express');
const ProductsRouter = require('./products/products.routes');
const CartsRouter = require('./cart/cart.routes');
const router = express.Router();

class ApiRouter {
  constructor() {
    this.productsRoutes = new ProductsRouter();
    this.cartsRoutes = new CartsRouter();
  }
  start() {
    //Routes
    router.use('/products', this.productsRoutes.start());
    router.use('/carrito', this.cartsRoutes.start());
    return router;
  }
}

module.exports = ApiRouter;