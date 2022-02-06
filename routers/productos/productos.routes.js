import express from 'express';
import { listarProductosPorIdController, guardarProductoController, actualizarProductoController, eliminarProductoController } from '../../controllers/productos.controllers.js';

const rutasProductos = express.Router();

rutasProductos.get('/:id?', listarProductosPorIdController);

rutasProductos.post('/', guardarProductoController);

rutasProductos.put('/:id', actualizarProductoController);

rutasProductos.delete('/:id', eliminarProductoController);

export default rutasProductos