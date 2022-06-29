const MongoDBContainer = require('../containers/Mongodb.container');
const AccountSchema = require('../schemas/mongo/Account.schema');

const collection = 'Account';
const db = 'ecommerce'
class AccountsDao extends MongoDBContainer {
  static instance;
  constructor() {
    super(collection, db, AccountSchema);
    if (!AccountsDao.instance) {
      AccountsDao.instance = this;
      return this;
    }
    else {
      return AccountsDao.instance; 
    }
  }
};

module.exports = AccountsDao;