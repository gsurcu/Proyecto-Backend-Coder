const ProductsDao = require('../models/daos/Products.dao')
const productosApi = new ProductsDao();

const listarProductosPorIdController = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const producto = await productosApi.getById(id);
    return res.status(200).json(producto);
  }
  const producto = await productosApi.getAll();
  return res.status(200).json(producto);
};

const guardarProductoController = async (req, res) => {
  const {title, price, imgUrl, code, description, stock} = req.body;
  
  if (title && price && imgUrl && code && description && stock) {
    const nuevoProducto = await productosApi.saveItem({title, price, imgUrl, code, description, stock } );
    return res.status(200).redirect("/");
  }

  return res.status(400).send("Faltan datos");
};

const actualizarProductoController = async (req, res) => {
  const { id } = req.params;
  const {title, price, imgUrl, code, description, stock} = req.body;
  
  if (title && price && imgUrl) {
    const productoActualizado = await productosApi.updateItem({title, price, imgUrl, code, description, stock}, id);
    if (productoActualizado) {
      return res.status(200).send("Producto actualizado");
    }
    return res.status(404).send("Producto no encontrado");
  }

  return res.status(400).send("Faltan datos");
};

const eliminarProductoController = async (req, res) => {
  const { id } = req.params;
  
  if (id) {
    const productoEliminado = await productosApi.delItem(id);
    if (productoEliminado) {
      return res.status(200).json({mensaje: "Producto eliminado"});
    }
    return res.status(404).json({mensaje: "Producto no encontrado"});
  }
};

module.exports = {
  listarProductosPorIdController,
  guardarProductoController,
  actualizarProductoController,
  eliminarProductoController,
};