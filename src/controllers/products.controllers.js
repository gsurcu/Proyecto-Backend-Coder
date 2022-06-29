const { errorLog } = require("../middlewares/logger");
const ProductsRepository = require("../models/repository/Products.repository");

class ProductsController {
  constructor() {
    this.productsDao = ProductsRepository    
  }

  async create (req, res) {
    try {
      const product = req.body;
      
      if (product) {
        const nuevoProducto = await this.productsDao.createProduct({product});
        if (nuevoProducto) {
          return res.status(200).json(nuevoProducto);
        }
        return res.status(404).send("No se pudo guardar el producto")
      }
      return res.status(400).send("Faltan datos");
    } catch (error) {
      errorLog(error.message)
    }
  };

  async read (req, res) {
    try {
      const id = req.params?.id;
      if (id) {
        const product = await this.productsDao.getProductById({id});
        return res.status(200).json(product);
      }
      const products = await this.productsDao.getAllProducts({})
      return res.status(200).json(products);
    } catch (error) {
      errorLog(error.message)
    }
  }
  
  async update (req, res) {
    try {
      const { id } = req.params;
      const item = req.body;
      
      const productoActualizado = await this.productsDao.updateProduct({ id, item });
      if (productoActualizado) {
        return res.status(200).json(productoActualizado);
      }
      return res.status(404).send("Producto no encontrado");      
    } catch (error) {
      errorLog(error.message)
    }
  };

  async delete (req, res) {
    try {
      const { id } = req.params;

      const productoEliminado = await this.productsDao.deleteProduct(id);
      if (productoEliminado) {
        return res.status(200).json(productoEliminado);
      }
      return res.status(404).json({mensaje: "Producto no encontrado"});
    } catch (error) {
      errorLog(error.message)
    }
  };

  async readByCategory (req, res) {}
}


module.exports = ProductsController;