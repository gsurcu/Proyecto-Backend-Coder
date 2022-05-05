const path = require('path');
const express = require('express');
const auth = require('../middlewares/auth');
const infoRoute = require('./info/info.routes');
const ProductsDao = require('../models/daos/Products.dao');
const CartsDao = require('../models/daos/Carts.dao');
const comprimir = require('../middlewares/comprimir');
const PORT = process.env.PORT || 8081
const router = express.Router();

const productos = new ProductsDao()
const cart = new CartsDao()

router.get('/', (req, res) => {
  const user = req.user;
  if (user) {
    return res.redirect('/profile');
  }
  else {
    return res.sendFile(path.resolve(__dirname, '../public/login.html'));
  }
});

router.get('/info', comprimir, infoRoute)

router.get('/profile', auth, async (req, res) => {
  const user = req.user;
  res.render('profile', { sessionUser: user });
});

router.get('/logout', auth, (req, res, next) => {
  req.logOut();
  res.redirect('/');
});

router.get('/prod', auth, async (req, res) => {
  const user = req.user;
  res.render('prod', { sessionUser: user, productos: await productos.getAll() });
});

router.get('/cart', auth, async (req, res) => {
  const user = req.user;
  res.render('cart', { sessionUser: user, cart: await cart.getCart(user._id)})
})

module.exports = router;