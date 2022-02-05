import express from 'express';
import { crearCarritoController,
  eliminarCarritoController,
  listarCarritoController,
  agregarProdCarritoController,
  eliminarProdCarritoController } from '../../controllers/carrito.controllers';

const rutasCarrito = express.Router();

rutasCarrito.post('/', crearCarritoController);

rutasCarrito.delete('/:id', eliminarCarritoController);

rutasCarrito.get('/:id/productos', listarCarritoController);

rutasCarrito.post('/:id/productos', agregarProdCarritoController);

rutasCarrito.delete('/:id/productos/:id_prod', eliminarProdCarritoController);

export default rutasCarrito;