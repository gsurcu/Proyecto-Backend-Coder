const config = require("../../config");
const ProductsFactoryDao = require("../factory/Products.factory.dao");

let productosDao = ProductsFactoryDao.get(config.TIPO_PERSISTENCIA);

module.exports = { productosDao };
