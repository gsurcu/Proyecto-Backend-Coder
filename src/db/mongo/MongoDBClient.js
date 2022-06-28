const DBClient = require('../DBClient');
const mongoose = require('mongoose');

class MongoDBClient extends DBClient {
  constructor(uri) {
    super();
    this.connected = false;
    this.uri = uri;
    this.client = mongoose;
  }

  async connect() {
    try {
      if (!this.connected) {
        await this.client.connect(this.uri);
        this.connected = true;
        console.log('Database connected');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error connecting databse')
    }
  }

  async disconnect() {
    try {
      if (this.connected) {
        await this.client.connection.close();
        this.connected = false;
        console.log('Database disconnected');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error connecting databse')
    }
  }
}

module.exports = MongoDBClient;