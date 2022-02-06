import {v4 as uuidv4} from "uuid";
import fs from "fs/promises"

export default class ProductosApi {
  constructor() {
    this.productos = [];
    this.archivo = "./data/data.json";
    this.load()
  }

  load() {
    try {
      const load = async () => {
        this.productos = await JSON.parse(fs.readFile(this.archivo,'utf-8'));
      };
      load();
    } catch (error) {
      console.log(error.message);
      this.productos = [];
    }
  }

  listarPorIdOTodo() {
    if (id) {
      return this.productos.find((producto) => producto.id === id);
    }
    return this.productos;
  };

  async guardar(prod) {
    const nuevoProducto = { ...prod, id: uuidv4(), timestamp: Date.now() };
    this.productos.push(nuevoProducto);

    await fs.promises.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
    return nuevoProducto;
  };

  async actualizar(prod, id) {
    const indice = this.productos.findIndex(prod => prod.id === +id);
    this.productos[indice] = { id: +id, ...prod };

    await fs.promises.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
  };

  async eliminar(id) {
    const indice = this.productos.findIndex(prod => prod.id === +id);
    this.productos.splice(indice, 1);
    
    await fs.promises.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
  }
}
