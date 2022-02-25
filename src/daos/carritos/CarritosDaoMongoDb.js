import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import mongoose from "mongoose";

const Schema = mongoose.Schema
const collection = "carritos"
const carritosSchema = new Schema({
  carritos: { type:Array, required:true }
})

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(collection, carritosSchema)
  }

}

export default CarritosDaoMongoDb;