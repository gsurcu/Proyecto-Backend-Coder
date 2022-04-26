const compression = require('compression');

const comprimir = async (req, res, next) => {
  const { val } = req.query
  // console.log(val)
  if (val == 'true') {
    compression();console.log(val)
  }
  next()
}

module.exports = comprimir;