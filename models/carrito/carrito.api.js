import {v4 as uuidv4} from "uuid";
import fs from "fs/promises"

export class CarritoApi {
  constructor() {
    this.carrito = [];
    this.archivo = "./data/carrito.json";
    this.load()
  }

  load() {
    try {
      const load = async () => {
        const data = await fs.readFile(this.archivo,'utf-8')
        console.log(data)
        this.productos = JSON.parse( data );
      };
      load();
    } catch (error) {
      console.log(error.message);
      this.productos = [];
    }
  }

  async crearCarrito() {
    const carrito = {
      id: uuidv4(),
      timeStamp: Date.now(),
      productos: [],
    };
    this.carrito.push(carrito);
    await fs.promises.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
    return carrito.id;
  }

  listarCarrito(id) {
    const index = this.carrito.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      return this.carrito[index].productos;
    }
    return [];
  };

  async agregarProducto(id, producto) {
    const index = this.carrito.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      this.carrito[index].productos.push(producto);
      await fs.promises.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
      return true;
    }
    return;
  };

  async eliminarCarrito(id) {
    const index = this.carrito.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      const newList = this.carrito.filter((carrito) => carrito.id !== id);
      this.carrito = newList;
      await fs.promises.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
      return true;
    }
    return;
  };

  async eliminarProducto(id, idProducto) {
    const index = this.carrito.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      const indexProducto = this.carrito[index].productos.findIndex(
        (producto) => producto.id === idProducto
      );
      if (indexProducto >= 0) {
        const newList = this.carrito[index].productos.filter(
          (producto) => producto.id !== idProducto
        );
        this.carrito[index].productos = newList;
        await fs.promises.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
        return true;
      }
      return false;
    }
    return false;
  }
}
