const register = async (req, res, next) => res.redirect('/profile');

const login = async (req, res, next) => res.redirect('/profile');

const signinError = async (req,res,next) => {

  res.redirect('/')
}

const signupError = async (req,res,next) => {

  res.redirect('/')
}
module.exports = {
  login,
  register,
  signinError,
  signupError,
}