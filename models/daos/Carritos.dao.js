const { errorLog } = require('../../middlewares/logger');
const MongoDBContainer = require('../containers/Mongodb.container');
const CarritoSchema = require('../schemas/Carrito.schema');
const ProductsDao = require('./Products.dao');

const collection = "carritos";
const Products = new ProductsDao();
class CarritosDao extends MongoDBContainer {
  constructor() {
    super(collection, CarritoSchema)
  }

  async create(id) {
    try {
      const carrito = await this.createItem({owner: id, carrito: []});
      // carrito.owner = user._id;
      await carrito.save();
      return carrito;
    } catch (error) {
      errorLog(error.message)
    }
  }

  async createProd(id, prodId, cant) {
    try {
      const createProd = this.model.findOneAndUpdate(
        { _id: id },
        { $push: { carrito: { prod_id: prodId, cant: cant } }},
        { returnDocument: "after" }
      ).lean()
      return createProd
      
    } catch (error) {
      errorLog(error.message)
    }
  }

  async updateProd(id, prodId, cant) {
    try {
      const updateProd = await this.model.findOneAndUpdate(
        { _id: id, "carrito.prod_id": prodId },
        { $set: { "carrito.$.cant" : cant } },
        { returnDocument: "after"}
      ).lean()
      return updateProd
    } catch (error) {
      errorLog(error.message)
    }
  }

  async delProd (id, prodId) {
    try {
      let doc = await this.model.findOne({_id: id }).lean();
      const carrito = doc.carrito.filter( prod => prod.prod_id != prodId);
      const updateProd = await this.model.findByIdAndUpdate(
        { _id: id },
        { $set: { carrito : carrito } },
        { returnDocument: "after"}
      ).lean();
      return updateProd;
    } catch (error) {
      errorLog(error.message)
    }
  }
  
  // DELETE: '/:id' - Vacía un carrito y lo elimina.
  async delItem(id) {
    try {
      const delItem = await this.model.findByIdAndDelete(id);
      return delItem
    } catch (error) {
      errorLog(error.message)
    }
  }

  // Negocio 
  // async totalCantidad () {
  //   try {
      
  //     return carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
  //   } catch (err) {
  //     errorLog(err)
  //   }
  // }

  // async totalCompra () {
  //   try {
      
  //     return carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0)
  //   } catch (err) {
  //     errorLog(err)
  //   }
  // }

  // async isInCart (id, prodId) {
  //   try {
  //     const carrito = await this.model.findOne({ _id: id, "carrito.prod_id": prodId }).lean();
  //     return carrito.some( prod => prod.id === prodId );
  //   } catch (err) {
  //     errorLog(err)
  //   }
  // }
}

module.exports = CarritosDao;