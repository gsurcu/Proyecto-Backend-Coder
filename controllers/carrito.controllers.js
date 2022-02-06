import { CarritoApi } from "../models/carrito/carrito.api";
import productos from "../controllers/productos.controllers"

const carrito = new CarritoApi();

const crearCarritoController = (req, res) => {
  const id = carrito.crearCarrito();
  return res.status(200).json({message: `Se creo el carrito con id: ${id}`});
};

const eliminarCarritoController = (req, res) => {
  const {id} = req.params;
  if (id) {
    const carrito = carrito.delete(id);
    if (carrito) {
      return res
        .status(200)
        .json({message: `Se elimino el carrito con id: ${id}`});
    }
    return res.status(400).json({error: "No se encontro el carrito"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const listarCarritoController = (req, res) => {
  const {id} = req.params;
  if (id) {
    const productos = carrito.getAllProducts(id);
    if (productos.length > 0) {
      return res.status(200).json(productos);
    }
    return res.status(400).json({error: "No se encontaron productos"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const agregarProdCarritoController = (req, res) => {
  const {id, id_prod} = req.params;

  if (id && id_prod) {
    const producto = productos.listarPorIdOTodo(id_prod);
    if (producto) {
      const carrito = carrito.addProducto(id, producto);
      if (carrito) {
        return res
          .status(200)
          .json({message: `Se agrego el producto con id: ${id_prod}`});
      }
      return res.status(400).json({error: "No se encontro el carrito"});
    }
    return res.status(400).json({error: "No se encontro el producto"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const eliminarProdCarritoController = (req, res) => {
  const {id, id_prod} = req.params;
  if (id && id_prod) {
    const producto = carrito.deleteProducto(id, id_prod);
    if (producto) {
      return res
        .status(200)
        .json({message: `Se elimino el producto con id: ${id_prod}`});
    }
    return res.status(400).json({error: "No se encontro el producto"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

export default {
  crearCarritoController,
  eliminarCarritoController,
  listarCarritoController,
  agregarProdCarritoController,
  eliminarProdCarritoController,
};