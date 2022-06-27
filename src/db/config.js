module.exports = {
  mongodb: {
    connectTo: (database) => `mongodb+srv://gab121:${process.env.DB_PASSWORD}@appprueba.jibhv.mongodb.net/${database}?retryWrites=true&w=majority`
  }
}