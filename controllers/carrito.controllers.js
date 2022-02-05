import { CarritoApi } from "../models/carrito/carrito.api";

const carrito = new CarritoApi();

const crearCarritoController = (req, res) => {
  const { idProducto } = req.params;
  const producto = carrito.listarPorId(idProducto);
  if (producto.error) return res.status(404).send(producto.error);
  return res.json(producto);
};

const eliminarCarritoController = (req, res) => {
  const nuevoProducto = carrito.guardar(req.body);
  console.log(carrito)
  if (nuevoProducto.error) return res.status(400).send(nuevoProducto.error);
  return res.json(nuevoProducto);
};

const listarCarritoController = (req, res) => {
  const { precio, busqueda } = req.query;
  let respuestacarrito =carrito.listarTodos();
  if (Object.keys(req.query).length) {
    if (precio) {
      if (isNaN(+precio)) {
        return res.status(400).send('precioMaximo must be a valid number');
      }
      respuestacarrito = respuestacarrito.filter(producto => producto.precio <= +precio);
    }
    if (busqueda) {
      respuestacarrito = respuestacarrito
        .filter(producto => 
          producto.nombre.toLowerCase().startsWith(busqueda.toLowerCase())
        )
    }
  }
  return res.json(respuestacarrito);
};

const agregarProdCarritoController = (req, res) => {
  const { params: { idProducto } } = req;
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