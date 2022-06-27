const CartsFileDao = require("../daos/carts/Carts.file.dao");
const CartsMemDao = require("../daos/carts/Carts.mem.dao");
const CartsMongoDao = require("../daos/carts/Carts.mongo.dao");

class CartsFactoryDao {
  static get(type) {
    switch (type) {
      case 'MEM': return new CartsMemDao()
      case 'FILE':  return new CartsFileDao(process.cwd() + '/carts.json')
      case 'MONGO': return new CartsMongoDao('carts', 'ecommerce')
      default:  return new CartsMemDao()
      }
  }
}

module.exports = CartsFactoryDao;