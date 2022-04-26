const { errorLog } = require('../../middlewares/logger');
const MongoDBContainer = require('../containers/Mongodb.container');
const ProductsSchema = require('../schemas/Products.schema');
const collection = "productos";

class ProductsDao extends MongoDBContainer {
  constructor() {
    super(collection, ProductsSchema)
  }
  async saveItem(item) {
    try {
      const newItem = {...item, timeStamp: Date.now()}
      return await this.createItem(newItem)
    } catch (error) {
      errorLog(error.message)
    }
  }
  
  async updateItem(id, item) {
    try {
      const updateItem = await this.model.findByIdAndUpdate(id, item)
      return updateItem
    } catch (error) {
      errorLog(error.message)
    }
  }

  async delItem(id) {
    try {
      const delItem = await this.model.findByIdAndDelete(id)
      return delItem
    } catch (error) {
      errorLog(error.message)
    }
  }
}

module.exports = ProductsDao