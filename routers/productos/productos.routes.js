import express from 'express';
const {
  listarProductosController,
  listarProductosPorIdController,
  guardarProductoController,
  actualizarProductoController,
  eliminarProductoController
} = require('../../controllers/productos.controllers');

const rutasProductos = express.Router();

rutasProductos.get('/', listarProductosController);

rutasProductos.get('/:id', listarProductosPorIdController);

rutasProductos.post('/', guardarProductoController);

rutasProductos.put('/:id', actualizarProductoController);

rutasProductos.delete('/:id', eliminarProductoController);

export default rutasProductos