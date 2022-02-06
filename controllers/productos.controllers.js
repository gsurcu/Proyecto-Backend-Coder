import { ProductosApi } from "../models/productos/productos.api";

const productos = new ProductosApi();

const listarProductosPorIdController = (req, res) => {
  const { idProducto } = req.params;

  if (idProducto) {
    const producto = productos.getAllOrById(idProducto);
    return res.status(200).json(producto);
  }
  const productos = productos.getAllOrById();
  return res.status(200).json(productos);
};

const guardarProductoController = (req, res) => {
  const { nombre, descripcion, precio, codigo, imagen, stock } = req.body;
  if (nombre && descripcion && precio && codigo && imagen && stock ) {
    const nuevoProducto = productos.guardar( {nombre, descripcion, precio, codigo, imagen, stock} );
    return res.status(200).json(nuevoProducto);
  }
  if (nuevoProducto.error) return res.status(400).send(nuevoProducto.error);
};

const actualizarProductoController = (req, res) => {
  const { idProducto } = req.params;
  const productoActualizado = productos.actualizar(req.body, idProducto);
  if (productoActualizado.error) return res.status(404).send(productoActualizado.error);
  return res.status(200).json(productoActualizado);
};

const eliminarProductoController = (req, res) => {
  const { idProducto } = req.params;
  const prodcutoEliminado = productos.eliminar(idProducto);
  if (prodcutoEliminado.error) return res.status(404).send(prodcutoEliminado.error);
  return res.status(200).json(prodcutoEliminado);
};

export default {
  listarProductosPorIdController,
  guardarProductoController,
  actualizarProductoController,
  eliminarProductoController,
  productos
};