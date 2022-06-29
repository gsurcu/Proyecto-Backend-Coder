const mongoose = require('mongoose');
const { formatErrorObject } = require('../../utils/api.utils');
const constants = require('../../constants/api.constants');
const { errorLog } = require('../../middlewares/logger')
const MongoDBClient = require('../../db/mongo/MongoDBClient');
const { DBConfig } = require('../../config/dbConfig');
const { 
  STATUS: { 
    INTERNAL_ERROR,
    NOT_FOUND,
    BAD_REQUEST,
  }
} = constants;

class MongoDBContainer {
  static instancia;
  constructor(collection, db, Schema) {
    if (!MongoDBContainer.instancia) {
      this.client = new MongoDBClient(DBConfig.mongo.DB_URI(db));
      this.client.connect();
      this.projection = DBConfig.mongo.projection;
      this.model = mongoose.model(collection, Schema);
      MongoDBContainer.instancia = this;
      return this;
    } else {
      return MongoDBContainer.instancia;      
    }
  };

  async getAll(filter = {}) {
    try{
      const documents = await this.model.find(filter, this.projection).lean();
      return documents;
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }

  async getById(id) {
    try {
      const document = await this.model.findById(id, this.projection).lean();
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
      await newItem.save();//console.log(newItem);
      return newItem;
    }
    catch (error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      errorLog(JSON.stringify(newError));
    }
  }
}

module.exports = MongoDBContainer;
