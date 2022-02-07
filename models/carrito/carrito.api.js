import {v4 as uuidv4} from "uuid";
import fs from "fs/promises"

export class CarritoApi {
  constructor() {
    this.carritos = [];
    this.archivo = "./data/carrito.json";
    this.open()
  }

  open() {
    try {
      const load = async () => {
        const data = await fs.readFile(this.archivo,'utf-8')
        console.log("open")
        this.carritos = JSON.parse( data );
      };
      load();
    } catch (error) {
      console.log(error.message);
      this.carritos = [];
    }
  }

  async crearCarrito() {
    const carrito = {
      id: uuidv4(),
      timeStamp: Date.now(),
      productos: [],
    };
    this.carritos.push(carrito);
    console.log("crear carrito");
    await fs.writeFile(this.archivo,JSON.stringify(this.carritos,null, 2));
    return carrito.id;
  }

  listarCarrito(id) {
    const index = this.carritos.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      return this.carritos[index].productos;
    }
    return [];
  };

  async agregarProducto(id, producto) {
    const index = this.carritos.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      this.carritos[index].productos.push(producto);
      await fs.writeFile(this.archivo,JSON.stringify(this.carritos,null, 2));
      return true;
    }
    return;
  };

  async eliminarCarrito(id) {
    const index = this.carritos.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      const newList = this.carritos.filter((carrito) => carrito.id !== id);
      this.carritos = newList;
      await fs.writeFile(this.archivo,JSON.stringify(this.carritos,null, 2));
      return true;
    }
    return;
  };

  async eliminarProducto(id, idProducto) {
    const index = this.carritos.findIndex((carrito) => carrito.id === id);
    if (index >= 0) {
      const indexProducto = this.carritos[index].productos.findIndex(
        (producto) => producto.id === idProducto
      );
      if (indexProducto >= 0) {
        const newList = this.carritos[index].productos.filter(
          (producto) => producto.id !== idProducto
        );
        this.carritos[index].productos = newList;
        await fs.writeFile(this.archivo,JSON.stringify(this.carritos,null, 2));
        return true;
      }
      return false;
    }
    return false;
  }
}
