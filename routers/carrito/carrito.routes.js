import express from 'express';
import { listarProductosController } from '../../controllers/productos.controllers';

const rutasCarrito = express.Router();

rutasCarrito.post('/', a);

rutasCarrito.get('/:id?', b);

rutasCarrito.get('/:id?/productos', c);

rutasCarrito.post('/:id?/productos', d);

rutasCarrito.delete('/:id?/productos/:id_prod', e);

export default rutasCarrito;