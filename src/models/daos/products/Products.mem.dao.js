const { v4: uuidv4 } = require("uuid")
const { errorLog } = require("../../../middlewares/logger")
const MemoryContainer = require("../../containers/Memory.container")

class ProductsMemDao extends MemoryContainer {
  static instance
  constructor() {
    super()
    if (!ProductsMemDao.instance) {
      ProductsMemDao.instance = this;
      return this;
    } else {
      return ProductsMemDao.instance;
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
      const newItem = {...item, _id: uuidv4(), timeStamp: Date.now()}
      return await this.createItem(newItem)
    } catch (error) {
      errorLog(error.message)
    }
  }
  
  async updateItem(id, item = {}) {
    try {
      const indice = this.items.findIndex(prod => prod.id === id);
      const updateItem = await this.getById(id);
      for (const key in item) {
        if (item[key] = '') {
          delete updateItem[key]
        } else {
          updateItem[key] = item[key];
        }
      }
      this.items[indice] = { ...updateItem };
      return updateItem
    } catch (error) {
      errorLog(error.message)
    }
  }

  async delItem(id) {
    try {
      const indice = this.items.findIndex(prod => prod.id === +id);
      return this.items.splice(indice, 1);
    } catch (error) {
      errorLog(error.message)
    }
  }
}

module.exports = ProductsMemDao;