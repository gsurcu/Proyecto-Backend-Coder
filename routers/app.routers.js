import express from 'express';
import rutasProductos from './productos/productos.routes.js';
import rutasCarrito from './carrito/carrito.routes.js';

const router = express.Router();

// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Rutas
router.use('/api/productos', rutasProductos);
router.use('/api/carrito', rutasCarrito);
router.use('*', (req, res) => {
  res.status(404).json({
    error: -2,
    descripcion: `La ruta ${req.baseUrl} con el metodo ${req.method} no esta implementado`,
  });
});

export {router};