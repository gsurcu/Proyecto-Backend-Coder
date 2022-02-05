import {v4 as uuidv4} from "uuid";

export default class CarritoApi {
  constructor() {
    this.carrito = [];
    this.load()
  }
  static idCount = 0;

  load() {
    try {
      const load = async () => {
        this.carrito = await productos;
      };
      load();
    } catch (error) {
      console.log(error.message);
      this.carrito = [];
    }
  }

  crearCarrito() {

    return this.carrito.id
  }

  listarTodos() {
    const producto = this.carrito.find(carrito => carrito.id === +id);
    return producto;
  };

  guardar(prod) {
    const { nombre, descripcion, precio, imagen } = prod;
    console.log(prod)
    if (!nombre || !imagen || !precio ) return { error: 'nombre, url y precio son campos obligatorios' };
    const nuevoProducto = { ...prod, id: ++CarritoApi.idCount };
    this.carrito.push(nuevoProducto);
    return nuevoProducto;
  };

  actualizar(prod, id) {
    const indice = this.carrito.findIndex(prod => prod.id === +id);
    if (indice < 0) return { error: `Producto con id ${id} no encontrado!` };
    this.carrito[indice] = { id: +id, ...prod };
    return this.carrito[indice];
  };

  eliminar(id) {
    const indice = this.carrito.findIndex(prod => prod.id === +id);
    if (indice < 0) return { error: `Producto con id ${id} no encontrado!` };
    return this.carrito.splice(indice, 1);
  }
}
