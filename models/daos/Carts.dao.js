const { errorLog } = require('../../middlewares/logger');
const MongoDBContainer = require('../containers/Mongodb.container');
const CarritoSchema = require('../schemas/Cart.schema');
const ProductsDao = require('./Products.dao');

const collection = "carritos";
const Products = new ProductsDao();
class CarritosDao extends MongoDBContainer {
  constructor() {
    super(collection, CarritoSchema)
  }

  async createCart(id) {
    try {
      const cart = await this.createItem({owner: id, cart: [], send: false});
      await cart.save();
      return cart;
    } catch (error) {
      errorLog(error.message);
    }
  }

  async getCart(id) {
    try {
      const cart = await this.model.findOne({ owner: id, send: false });
      return cart;
    } catch (error) {
      errorLog(error.message);
    }
  }

  async createProd(id, cant, prod) {
    try {
      const createProd = this.model.findOneAndUpdate(
        { _id: id },
        { $push: { 
            cart: { 
              cant: cant,
              title: prod.title, 
              imgUrl : prod.imgUrl, 
              price: prod.price, 
              prod_id: prod._id, 
            } 
          }
        },
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

  async delProd(id, prodId) {
    try {
      let doc = await this.model.findOne({_id: id }).lean();
      const carrito = doc.carrito.filter( prod => prod.prod_id != prodId);
      const updateProd = await this.model.findByOneAndUpdate(
        { _id: id },
        { $set: { cart: carrito } },
        { returnDocument: "after"}
      ).lean();
      return updateProd;
    } catch (error) {
      errorLog(error.message)
    }
  }

  async sendCart() {
    try {
      const sendCart = await this.model.findOneAndUpdate(
        { _id: id },
        { $set: { send: true } },
        { returnDocument: "after"}
      ).lean();
      return sendCart;
    } catch (error) {
      errorLog(error.message)
    }
  }
  
  async delCart(id) {
    try {
      const delItem = await this.model.findByIdAndDelete(id);
      return delItem
    } catch (error) {
      errorLog(error.message)
    }
  }
}

module.exports = CarritosDao;