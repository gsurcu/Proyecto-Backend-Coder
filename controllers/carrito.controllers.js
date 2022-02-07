import { CarritoApi } from "../models/carrito/carrito.api.js";
import { productos } from "../controllers/productos.controllers.js"

const carrito = new CarritoApi();

const crearCarritoController = async (req, res) => {
  const id = await carrito.crearCarrito();
  return res.status(200).json({message: `Se creo el carrito con id: ${id}`});
};

const eliminarCarritoController = async (req, res) => {
  const {id} = req.params;
  if (id) {
    const carritoEliminado = await carrito.eliminarCarrito(id);
    if (carritoEliminado) {
      return res.status(200).json({message: `Se elimino el carrito con id: ${id}`});
    }
    return res.status(400).json({error: "No se encontro el carrito"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const listarCarritoController = (req, res) => {
  const {id} = req.params;
  if (id) {
    const productos = carrito.listarCarrito(id);
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
    const producto = productos.listarPorIdOTodo(id_prod);
    if (producto) {
      const agregarProducto = await carrito.agregarProducto(id, producto);
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
    const producto = await carrito.eliminarProducto(id, id_prod);
    if (producto) {
      return res.status(200).json({message: `Se elimino el producto con id: ${id_prod}`});
    }
    return res.status(400).json({error: "No se encontro el producto"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

export {
  crearCarritoController,
  eliminarCarritoController,
  listarCarritoController,
  agregarProdCarritoController,
  eliminarProdCarritoController,
};