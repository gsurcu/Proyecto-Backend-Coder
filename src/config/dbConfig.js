const { DB_PASSWORD } = require("./index")

const DBConfig = {
  mongo: {
    DB_URI: (database) => `mongodb+srv://gab121:${DB_PASSWORD}@appprueba.jibhv.mongodb.net/${database}?retryWrites=true&w=majority`,
    projection: { __v: 0 }
  }
}

module.exports = {
  DBConfig,
}