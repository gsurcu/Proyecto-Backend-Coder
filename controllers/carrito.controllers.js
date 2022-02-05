import { CarritoApi } from "../models/carrito/carrito.api";
import ProductosApi from "../models/productos/productos.api";

const carrito = new CarritoApi();

const crearCarritoController = (req, res) => {
  const id = carrito.crearCarrito();
  return res.status(200).json({message: `Se creo el carrito con id: ${id}`});
};

const eliminarCarritoController = (req, res) => {
  const nuevoProducto = carrito.guardar(req.body);
  console.log(carrito)
  if (nuevoProducto.error) return res.status(400).send(nuevoProducto.error);
  return res.json(nuevoProducto);
};

const listarCarritoController = (req, res) => {
  const { id } = req.params;
  if (id) {
    const producto = carrito.listarTodos(id);
    if (producto.error) return res.status(404).send(producto.error);
    return res.status(200).json(producto);
  }
  return res.status(200).json(respuestaProductos);
};

const agregarProdCarritoController = (req, res) => {
  const { params: { id } } = req;
  const productoActualizado = carrito.actualizar(req.body, idProducto);
  if (productoActualizado.error) return res.status(404).send(productoActualizado.error);
  return res.json(productoActualizado);
};

const eliminarProdCarritoController = (req, res) => {
  const { idProducto } = req.params;
  const prodcutoEliminado = carrito.eliminar(idProducto);
  if (prodcutoEliminado.error) return res.status(404).send(prodcutoEliminado.error);
  return res.json(prodcutoEliminado);
};

export default {
  crearCarritoController,
  eliminarCarritoController,
  listarCarritoController,
  agregarProdCarritoController,
  eliminarProdCarritoController,
  carrito,
};