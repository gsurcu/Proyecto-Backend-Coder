const ProductsFileDao = require("../daos/products/Products.file.dao");
const ProductsMemDao = require("../daos/products/Products.mem.dao");
const ProductsMongoDao = require("../daos/products/Products.mongo.dao");

class ProductsFactoryDao {
  static get(type) {
    switch (type) {
      case 'MEM': return new ProductsMemDao()
      case 'FILE':  return new ProductsFileDao(process.cwd() + '/products.json')
      case 'MONGO': return new ProductsMongoDao('products', 'ecommerce')
      default:  return new ProductsMemDao()
      }
  }
}

module.exports = ProductsFactoryDao;