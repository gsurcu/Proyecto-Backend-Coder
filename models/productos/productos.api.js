import {v4 as uuidv4} from "uuid";
import fs from "fs/promises"

export class ProductosApi {
  constructor() {
    this.productos = [];
    this.archivo = "./data/data.json";
    this.open()
  }

  open() {
    try {
      const load = async () => {
        const data = await fs.readFile(this.archivo,'utf-8');
        this.productos = JSON.parse(data);
        // console.log(this.productos)
      };
      load();
    } catch (error) {
      console.log(error.message);
      this.productos = [];
    }
  }

  listarPorIdOTodo(id) {
    if (id) {
      const data = this.productos.find((producto) => producto.id === id);
      console.log(id)
      return data
    }
    return this.productos;
  };

  async guardar(prod) {
    const nuevoProducto = { ...prod, id: uuidv4(), timestamp: Date.now() };
    if (nuevoProducto) {
      this.productos.push(nuevoProducto);
      
      await fs.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
      return nuevoProducto;
    }
    return {}
  };

  async actualizar(prod, id) {
    const indice = this.productos.findIndex(prod => prod.id === id);
    this.productos[indice] = { id: id, ...prod };

    await fs.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
    return
  };

  async eliminar(id) {
    const indice = this.productos.findIndex(prod => prod.id === id);
    this.productos.splice(indice, 1);
    
    await fs.writeFile(this.archivo,JSON.stringify(this.productos,null, 2));
    return
  }
}
