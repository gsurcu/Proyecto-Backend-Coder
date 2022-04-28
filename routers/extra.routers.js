const path = require('path');
const express = require('express');
const auth = require('../middlewares/auth');
const infoRoute = require('./info/info.routes');
const ProductsDao = require('../models/daos/Products.dao');
const comprimir = require('../middlewares/comprimir');
const PORT = process.env.PORT || 8081
const router = express.Router();

const productos = new ProductsDao('productos')

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

router.get('/datos', (req, res) => {
  const html =`Servidor express <span style="color: coral;font-weight: bold;">(NginX)</span> | ${PORT} - <b>PID => ${process.pid}</b> - ${new Date().toLocaleString()}`
  res.send(html);
});

router.get('/profile', auth, async (req, res) => {
  const user = req.user;
  res.render('profile', { sessionUser: user, productos: await productos.getAll() });
});

router.get('/logout', auth, (req, res, next) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router;