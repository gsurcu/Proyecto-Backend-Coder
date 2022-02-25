import { productosDao as productos } from "../src/daos/index.js";
const listarProductosPorIdController = (req, res) => {
  const { id } = req.params;
  if (id) {
    console.log(id)
    const producto = productos.listar(id);
    return res.status(200).json(producto);
  }
  const producto = productos.listarAll();
  return res.status(200).json(producto);
};

const guardarProductoController = async (req, res) => {
  const { nombre, descripcion, precio, codigo, imgUrl, stock } = req.body || {};
  if (nombre && descripcion && precio && codigo && imgUrl && stock ) {
    const nuevoProducto = await productos.guardar( {nombre, descripcion, precio, codigo, imgUrl, stock} );
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