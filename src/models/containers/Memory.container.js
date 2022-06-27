const { errorLog } = require("../../middlewares/logger");
const { formatErrorObject } = require("../../utils/api.utils");
const constants = require('../../constants/api.constants');
const { 
  STATUS: { 
    INTERNAL_ERROR,
    NOT_FOUND,
    BAD_REQUEST,
  }
} = constants;

class MemoryContainer {
  static instancia;
  constructor() {
    this.items = [];
  }
  

  async getAll() {
    try{
      return [...this.items];
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }

  async getById(id) {
    try {
      const item = this.items.find(prod => prod._id === id);
      if (!item) {
        const errorMessage = `Resource with id ${id} does not exist in our records`;
        const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
        errorLog(JSON.stringify(newError));
      } else {
        return item;
      }
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }

  async createItem(resourceItem) {
    try {
      if (typeof resourceItem == 'object') {
        this.items.push(resourceItem)
        return resourceItem
      }
      return false;
    }
    catch (error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }

  async deleteAll() {
    try {
      this.items = []
    } catch (error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }
}

module.exports = MemoryContainer;