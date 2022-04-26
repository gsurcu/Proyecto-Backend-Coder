const express = require('express');
const authControllers = require('../../../controllers/auth.controllers');
const passport = require('../../../middlewares/passport');

const router = express.Router();

router.post(
  '/register',
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