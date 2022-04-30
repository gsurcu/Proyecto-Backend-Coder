const { errorLog } = require('../../middlewares/logger');
const MongoDBContainer = require('../containers/Mongodb.container');
const CarritoSchema = require('../schemas/Carrito.schema');
const ProductsDao = require('./Products.dao');

const collection = "carritos";
const Products = ProductsDao();
class CarritosDao extends MongoDBContainer {
  constructor() {
    super(collection, CarritoSchema)
  }
  async agregarAlCarrito (item) {
    try {
      setCarrito( [...carrito, item] )
      
    } catch (err) {
      errorLog(err)
    }
  }

  async removerDelCarrito (id) {
    try {
      setCarrito( carrito.filter(prod => prod.id !== id ) )
      
    } catch (err) {
      errorLog(err)
    }
  }

  async vaciarCarrito () {
    try {
      setCarrito([])
      
    } catch (err) {
      errorLog(err)
    }
  }

  async totalCantidad () {
    try {
      
      return carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
    } catch (err) {
      errorLog(err)
    }
  }

  async totalCompra () {
    try {
      
      return carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0)
    } catch (err) {
      errorLog(err)
    }
  }

  async isInCart (id) {
    try {
      
      return carrito.some( prod => prod.id === id )
    } catch (err) {
      errorLog(err)
    }
  }
}

module.exports = CarritosDao;