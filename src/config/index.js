const dotenv = require('dotenv')
dotenv.config()
dotenv.config({
  path: require('path').resolve(process.cwd(), process.env.NODE_ENV + '.env')
});

const {
  NODE_ENV,
  HOST,
  PORT,
  TIPO_PERSISTENCIA,
} = process.env;

module.exports = {
  NODE_ENV: NODE_ENV || 'development',
  HOST: HOST || 'localhost',
  PORT: PORT || 8080,
  // MEM - FILE - MONGO
  TIPO_PERSISTENCIA: TIPO_PERSISTENCIA || 'MEM'
}