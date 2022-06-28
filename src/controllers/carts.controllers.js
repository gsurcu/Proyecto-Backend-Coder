const CartsDao = require('../models/daos/carts/Carts.dao');
const ProductsDao = require('../models/factory/Products.factory.dao')

class CartsController {
  constructor() {
    this.cartsDao = new CartsDao('ecommerce', 'carritos');
    this.productsDao = ProductsDao.get();
  }

  createCart = async (req, res) => {
    const user = req.user;
    const id = await this.cartsDao.createCart(user._id);
    return res.status(200).json({message: `Se creo el carrito con id: ${id}`});
  };

  deleteCart = async (req, res) => {
    const {id} = req.params;
    if (id) {
      const carritoEliminado = await this.cartsDao.delCart(id)
      if (carritoEliminado) {
        return res.status(200).json({message: `Se elimino el carrito con id: ${id}`});
      }
      return res.status(400).json({error: "No se encontro el carrito"});
    }
    return res.status(400).json({error: "No se proporciono ningun id"});
  };

  listCart = async (req, res) => {
    const {id} = req.params;
    if (id) {
      const productos = await this.cartsDao.getById(id);
      if (productos.length > 0) {
        return res.status(200).json(productos);
      }
      return res.status(400).json({error: "No se encontaron productos"});
    }
    return res.status(400).json({error: "No se proporciono ningun id"});
  };

  addProd = async (req, res) => {
    const {id, id_prod} = req.params;
    
    if (id && id_prod) {
      const producto = this.productsDao.getById(id_prod);
      if (producto) {
        const agregarProducto = await this.cartsDao.createProd(id, producto);
        if (agregarProducto) {
          return res.status(200).json({message: `Se agrego un producto al carrito con el id: ${id}. Se agrego el producto con id: ${id_prod}.`});
        }
        return res.status(400).json({error: "No se encontro el carrito"});
      }
      return res.status(400).json({error: "No se encontro el producto"});
    }
    return res.status(400).json({error: "No se proporciono ningun id"});
  };
    
  deleteProd = async (req, res) => {
    const {id, id_prod} = req.params;
    if (id && id_prod) {
      const producto = await this.cartsDao.delProd(id, id_prod);
      if (producto) {
        return res.status(200).json({message: `Se elimino el producto con id: ${id_prod}`});
      }
      return res.status(400).json({error: "No se encontro el producto"});
    }
    return res.status(400).json({error: "No se proporciono ningun id"});
  };
}

module.exports = CartsController;