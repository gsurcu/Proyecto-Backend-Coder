const express = require('express');
const authControllers = require('../../../controllers/auth.controllers');
const passport = require('../../../middlewares/passport');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{ cb(null, 'public/img/profile')},
  filename: (req, file, cb) => { 
    const extension = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
  }
})
const upload = multer({ storage });

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