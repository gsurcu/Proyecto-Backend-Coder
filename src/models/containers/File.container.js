const fs = require("fs");
const { errorLog } = require("../../middlewares/logger");
const { formatErrorObject } = require('../../utils/api.utils');
const constants = require('../../constants/api.constants');
const { 
  STATUS: { 
    INTERNAL_ERROR,
    NOT_FOUND,
    BAD_REQUEST,
  }
} = constants;

class FileContainer {
  static instancia;
  constructor(fileName) {
    this.fileName = fileName;
    this.open();
  }

  async open(){
    try {
      if (fs.existsSync(this.fileName)) {
        const doc = fs.readFileSync(this.fileName,'utf-8');
        if(!doc) {
          return await this.createItem([]);
        }
        return JSON.parse(doc)
      } else {
        await this.createItem([]);
      }
    } catch (error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }

  async getAll() {
    try{
      if(fs.existsSync(this.fileName)) {
        const docs = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
        return docs;
      } else {
        return false
      }
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }

  async getById(id) {
    try {
      const docs = await this.getAll();
      if (docs) {
        const doc = docs.find(prod => prod.id === +id);
        if (!doc) {
          const errorMessage = `Resource with id ${id} does not exist in our records`;
          const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
          errorLog(JSON.stringify(newError));
        } else {
          return doc;
        }
      }
      return false
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }

  async createItem(resourceItem) {
    try {
      await fs.promises.writeFile(this.fileName, JSON.stringify(resourceItem, null, 2), 'utf-8');;
      return resourceItem;
    }
    catch (error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }

  async deleteAll() {
    try {
      return await fs.promises.unlink(this.fileName);
    } catch (error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }
}

module.exports = FileContainer;