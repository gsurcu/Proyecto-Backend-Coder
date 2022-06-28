const express = require('express');
const ApiRouter = require('./api/api.routes');
const { warnLog, infoLog } = require('../middlewares/logger');
const router = express.Router();


//Routes
class Router {
  constructor() {
    this.apiRoutes = new ApiRouter()
  }

  start(){
    router.use(infoLog);
    router.use('/api', this.apiRoutes.start());
    router.use('/*', warnLog);
    return router;
  }
}

module.exports = Router;