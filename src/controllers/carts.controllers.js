const CarritosDao = require('../models/daos/Carts.dao');
const ProductsDao = require('../models/daos/Products.dao')
const productos = new ProductsDao()
const carrito = new CarritosDao()

const crearCarritoController = async (req, res) => {
  const user = req.user;
  const id = await carrito.createCart(user._id);
  return res.status(200).json({message: `Se creo el carrito con id: ${id}`});
};

const eliminarCarritoController = async (req, res) => {
  const {id} = req.params;
  if (id) {
    const carritoEliminado = await carrito.delCart(id)
    if (carritoEliminado) {
      return res.status(200).json({message: `Se elimino el carrito con id: ${id}`});
    }
    return res.status(400).json({error: "No se encontro el carrito"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const listarCarritoController = async (req, res) => {
  const {id} = req.params;
  if (id) {
    const productos = await carrito.getById(id);
    if (productos.length > 0) {
      return res.status(200).json(productos);
    }
    return res.status(400).json({error: "No se encontaron productos"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const agregarProdCarritoController = async (req, res) => {
  const {id, id_prod} = req.params;

  if (id && id_prod) {
    const producto = productos.getById(id_prod);
    if (producto) {
      const agregarProducto = await carrito.createProd(id, producto);
      if (agregarProducto) {
        return res.status(200).json({message: `Se agrego un producto al carrito con el id: ${id}. Se agrego el producto con id: ${id_prod}.`});
      }
      return res.status(400).json({error: "No se encontro el carrito"});
    }
    return res.status(400).json({error: "No se encontro el producto"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const eliminarProdCarritoController = async (req, res) => {
  const {id, id_prod} = req.params;
  if (id && id_prod) {
    const producto = await carrito.delProd(id, id_prod);
    if (producto) {
      return res.status(200).json({message: `Se elimino el producto con id: ${id_prod}`});
    }
    return res.status(400).json({error: "No se encontro el producto"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

module.exports = {
  crearCarritoController,
  eliminarCarritoController,
  listarCarritoController,
  agregarProdCarritoController,
  eliminarProdCarritoController,
};