import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const collection = "productos"
const productosSchema = new Schema({
  id: mongoose.ObjectId,
  timeStamp: {type: Number, required: true},
  nombre: {type: String, required: true},
  descripcion: {type: String, required: true},
  codigo: {type: Number, required: true},
  imgUrl: {type: String, required: true},
  precio: {type: Number, required: true},
  stock: {type: Number, required: true}
})

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(collection,productosSchema)
  }
}

export default ProductosDaoMongoDb;