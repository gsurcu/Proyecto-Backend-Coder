
const mongoose = require('mongoose');
const { formatErrorObject } = require('../../utils/api.utils');
const constants = require('../../constants/api.constants');
const { errorLog } = require('../../middlewares/logger')

const { 
  STATUS: { 
    INTERNAL_ERROR,
    NOT_FOUND,
    BAD_REQUEST,
  }
} = constants;

class MongoDBContainer {
  static instancia;
  constructor(collection, Schema) {
    this.model = mongoose.model(collection, Schema);
  };

  async getAll(filter = {}) {
    try{
      const documents = await this.model.find(filter,{ __v: 0 }).lean();
      return documents;
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }

  async getById(id) {
    try {
      const document = await this.model.findById(id, { __v: 0 }).lean();
      if (!document) {
        const errorMessage = `Resource with id ${id} does not exist in our records`;
        const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
        errorLog(JSON.stringify(newError));
      } else {
        return document;
      }
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }

  async createItem(resourceItem) {
    try {
      const newItem = new this.model(resourceItem);
      await newItem.save();console.log(newItem);
      return newItem;
    }
    catch (error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }
}

module.exports = MongoDBContainer;
