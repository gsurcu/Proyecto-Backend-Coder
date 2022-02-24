// import { ProductosApi } from "../models/productos/productos.api.js";

// const productos = new ProductosApi();

const listarProductosPorIdController = (req, res) => {
  const { id } = req.params;
  if (id) {
    console.log(id)
    const producto = productos.listarPorIdOTodo(id);
    return res.status(200).json(producto);
  }
  const producto = productos.listarPorIdOTodo();
  return res.status(200).json(producto);
};

const guardarProductoController = async (req, res) => {
  const { nombre, descripcion, precio, codigo, imagen, stock } = req.body || {};
  if (nombre && descripcion && precio && codigo && imagen && stock ) {
    const nuevoProducto = await productos.guardar( {nombre, descripcion, precio, codigo, imagen, stock} );
    console.log(nuevoProducto)
    return res.status(200).json(nuevoProducto);
  }
  return res.status(400).json({error: "Faltan datos"});
};

const actualizarProductoController = async (req, res) => {
  const { id } = req.params;
  const {title, price, thumbnail} = req.body;
  
  if (title && price && thumbnail) {
    const productoActualizado = await productos.actualizar({title, price, thumbnail}, id);
    
    if (productoActualizado) {
      return res.status(200).send("Producto actualizado");
    }
    return res.status(404).send("Producto no encontrado");
  };
}

const eliminarProductoController = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const productoEliminado = await productos.eliminar(id);
    
    if (productoEliminado) {
      return res.status(200).json("Producto eliminado");
    }
    return res.status(404).send("No se pudo eliminar el producto");
  }
  return res.status(404).send("Producto no encontrado");
};

export {
  listarProductosPorIdController,
  guardarProductoController,
  actualizarProductoController,
  eliminarProductoController,
  productos
};