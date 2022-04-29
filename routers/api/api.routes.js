const express = require('express');
const path = require('path')
const rutasProductos = require('./productos/productos.routes')
const authRoutes = require('./auth/auth.routes');
const randomNumber = require('./random/random.routes')
const router = express.Router();

//Routes
router.use('/auth', authRoutes);
router.use('/productos', rutasProductos);

router.get('/randoms', async (req, res) => {
  const { cant } = req.query
  const random = randomNumber(Number(cant))
  res.render('random', { num: random})
})

module.exports = router;