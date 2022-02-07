import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { listarProductosPorIdController, guardarProductoController, actualizarProductoController, eliminarProductoController } from '../../controllers/productos.controllers.js';

const rutasProductos = express.Router();

rutasProductos.get('/:id?', listarProductosPorIdController);

rutasProductos.post('/',authMiddleware, guardarProductoController);

rutasProductos.put('/:id',authMiddleware, actualizarProductoController);

rutasProductos.delete('/:id',authMiddleware, eliminarProductoController);

export default rutasProductos