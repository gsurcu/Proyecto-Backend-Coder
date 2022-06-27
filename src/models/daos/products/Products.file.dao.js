const { v4: uuidv4 } = require("uuid")
const { errorLog } = require("../../../middlewares/logger");
const FileContainer = require("../../containers/File.container");
// const productsDto = require("../../dtos/Products.dto");

class ProductsFileDao extends FileContainer {
  static instance;
  constructor(fileName) {
    super(fileName)
    if (!ProductsFileDao.instance) {
      ProductsFileDao.instance = this;
      return this;
    } else {
      return ProductsFileDao.instance;
    }
  }

  async getItem(id) {
    if(id) {
      return await this.getById(id)
    }
    return await this.getAll()
  }

  async saveItem(item) {
    try {
      const items = await this.getAll();
      const newItem = {...item, _id: uuidv4(), timeStamp: Date.now()};
      items.push(newItem);
      await this.createItem(items);
      return newItem
    } catch (error) {
      errorLog(error.message)
    }
  }
  
  async updateItem(id, item = {}) {
    try {
      const items = await this.getAll()
      const indice = items.findIndex(prod => prod.id === id);
      if (indice) {
        const updateItem = await this.getById(id);
        for (const key in item) {
          if (item[key] = '') {
            delete updateItem[key];
          } else {
            updateItem[key] = item[key];
          }
        }
        items[indice] = { ...updateItem };
        await this.createItem(items);
        return updateItem;
      }
      return false
    } catch (error) {
      errorLog(error.message)
    }
  } 

  async delItem(id) {
    try {
      const docs = await this.getAll();
      if (docs) {
        const newDocs = docs.filter(item => item._id !== id);
        return await this.createItem(newDocs);
      }
      return false;
    } catch (error) {
      errorLog(error.message)
    }
  }
}

module.exports = ProductsFileDao;