const express = require('express');
const authControllers = require('../../../controllers/auth.controllers');
const passport = require('../../../middlewares/passport');
const multer = require('multer')
const path = require('path')

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{ cb(null, 'public/uploads')},
  filename: (req, file, cb) => { 
    const extension = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
  }
})
const upload = multer({ storage });

router.post('/archivo', upload.single('archivo'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Debes cargar un archivo');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.sendFile(path.resolve(__dirname, `../../public/uploads/${file.filename}`));
})

router.post(
  '/register',
  upload.single('image'),
  passport.authenticate('signup', { failureRedirect: '/api/auth/signup-error' }), 
  authControllers.register
);
router.get('/signup-error', authControllers.signupError)

router.post(
  '/login',
  passport.authenticate('signin', { failureRedirect: '/api/auth/signin-error' }),
  authControllers.login
);
router.get('/signin-error', authControllers.signinError)


module.exports = router;