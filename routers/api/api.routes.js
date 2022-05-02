const express = require('express');
const productsRoutes = require('./productos/productos.routes');
const carritoRoutes = require('./carrito/carrito.routes');
const authRoutes = require('./auth/auth.routes');
const randomNumber = require('./random/random.routes');
const router = express.Router();

//Routes
router.use('/auth', authRoutes);
router.use('/productos', productsRoutes);
router.use('/carrito', carritoRoutes);

router.get('/randoms', async (req, res) => {
  const { cant } = req.query;
  const random = randomNumber(Number(cant));
  res.render('random', { num: random});
})

module.exports = router;