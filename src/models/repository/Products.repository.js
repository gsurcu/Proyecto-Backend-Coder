const {STATUS} = require("../../constants/api.constants");
const { formatErrorObject } = require("../../utils/api.utils");
const {productosDao} = require("../daos");
const ProductDto = require("../dtos/Products.dto.js");
//Repository de productos
class ProductsRepository {
  static #instance;
  constructor() {
    if (!!ProductsRepository.#instance) {
      return ProductsRepository.#instance;
    }
    ProductsRepository.#instance = this;
  }

  async getProductById({id}) {
    try {
      if (!id) {
        const newError = formatErrorObject(
          STATUS.NOT_FOUND,
          "Id no especificado"
        );
        throw new Error(JSON.stringify(newError));
      }

      const productoFromDB = await productosDao.getItem(id);
      const productDto = new ProductDto();
      productDto.id = productoFromDB._id;
      productDto.title = productoFromDB.title;
      productDto.price = productoFromDB.price;
      productDto.imgUrl = productoFromDB.imgUrl;
      productDto.description = productoFromDB.description;
      return productDto;
    } catch (error) {
      const newError = formatErrorObject(
        STATUS.NOT_FOUND,
        `No se encontro el producto con id: ${id}`
      );
      throw new Error(JSON.stringify(newError));
    }
  }

  async getAllProducts() {
    try {
      const productosFromDB = await productosDao.getItem();
      const lista = [];
      productosFromDB.forEach((producto) => {
        const productDto = new ProductDto();
        productDto.id = producto._id.toString();
        productDto.title = producto.title;
        productDto.price = producto.price;
        productDto.imgUrl = producto.imgUrl;
        productDto.description = producto.description;
        lista.push(productDto);
      });
      return lista;
    } catch (error) {
      const newError = formatErrorObject(STATUS.NOT_FOUND, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }

  async createProduct({product}) {
    try { //let prod = JSON.parse(JSON.stringify(product))
      if (!product) {
        throw new Error("No se proporciono ningun producto.");
      }
      const {title, price, imgUrl} = product;
    //  console.log(prod)
      if (!title) {
        throw new Error("No se puede crear un producto sin titulo.");
      }
      if (!price) {
        throw new Error("No se puede crear un producto sin precio.");
      }
      if (!imgUrl) {
        throw new Error("No se puede crear un producto sin imagen.");
      }

      const result = await productosDao.saveItem(product);console.log(result)
      return result;
    } catch (error) {
      const newError = formatErrorObject(STATUS.BAD_REQUEST, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }

  async updateProduct({id, product}) {
    try {
      if (!id ) {
        const newError = formatErrorObject(
          STATUS.BAD_REQUEST,
          `Error en la petición. No se proporciono ningun ID o producto.`
        );
        throw new Error(JSON.stringify(newError));
      }
      const {title, price, imgUrl} = product;
      if (!price) {
        const newError = formatErrorObject(
          STATUS.BAD_REQUEST,
          "No se puede actualizar el precio. Debe estar definido o ser mayor que 0."
        );
        throw new Error(JSON.stringify(newError));
      }

      if (!imgUrl) {
        const newError = formatErrorObject(
          STATUS.BAD_REQUEST,
          "No se puede actualizar la imagen. Debe ingresar una url valida."
        );
        throw new Error(JSON.stringify(newError));
      }

      if (!title) {
        const newError = formatErrorObject(
          STATUS.BAD_REQUEST,
          "No se puede actualizar el titulo. Debe ingresar un titulo valido."
        );
        throw new Error(JSON.stringify(newError));
      }
      await productosDao.updateItem(id, product);

      return {...producto};
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct({id}) {
    try {
      if (!id) {
        const newError = formatErrorObject(
          STATUS.BAD_REQUEST,
          "No se proporciono ningun ID."
        );
        throw new Error(newError);
      }
      const deleted = await productosDao.deleteItem(id);
      if (deleted === null) {
        const newError = formatErrorObject(
          STATUS.NOT_FOUND,
          `No se encontro el producto con id: ${id}`
        );
        throw new Error(JSON.stringify(newError));
      }

      const response = {
        doc: deleted._doc,
        message: `Se elimino satisfactoriammente el producto.`,
      };

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const instance = new ProductsRepository();
module.exports = instance;