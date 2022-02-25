let productosDao;
let carritosDao;

let DATABASE = 'mongoDb'

const mongoDatabase = async () => {
  
}

switch (DATABASE) {
  case 'mongoDb':
    const  {default: ProductosDaoMongoDb} = await import('../daos/productos/ProductosDaoMongoDb.js')
    const  {default: CarritosDaoMongoDb} = await import('../daos/carritos/CarritosDaoMongoDb.js')
    productosDao = new ProductosDaoMongoDb()
    carritosDao = new CarritosDaoMongoDb()
    break;
  case 'firebase':
    const {default: ProductosDaoFirebase} = await import('../daos/productos/ProductosDaoFirebase.js');
    const {default: CarritosDaoFirebase} = await import('../daos/carritos/CarritosDaoFirebase.js');
    productosDao = new ProductosDaoFirebase()
    carritosDao = new CarritosDaoFirebase()
    break;
  default:
    break;
}

export { productosDao, carritosDao };