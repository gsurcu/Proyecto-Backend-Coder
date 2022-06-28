const MongoDBContainer = require('../containers/Mongodb.container')
const { normalize, schema } = require('normalizr')
const ChatSchema = require('../schemas/mongo/Chat.schema')
const { errorLog } = require('../../middlewares/logger')

const collection = "chat"

class ChatDao extends MongoDBContainer {
  static instance;
  constructor() {
    super(collection, ChatSchema);
    if (!ChatDao.instance) {
      ChatDao.instance = this;
      return this;
    } else {
      return ChatDao.instance;
    }
  }

  async normalizar(){
    try {
      const data = await this.getAll()
      if (!data) {
        return false
      } else {
        const dataJson = JSON.stringify(data);
        const dataParsed = JSON.parse(dataJson);

        const schemaAll = {
          id: 'mensajes',
          mensajes: dataParsed,
        };

        const userSchema = new schema.Entity('user',{}, 
        {
          idAttribute: 'email'
        })
        const postSchema = new schema.Entity('post',
        {
          author: userSchema
        },
        {
          idAttribute: '_id'
        })
        const posts = new schema.Entity('posts',
        {
          mensajes: [postSchema]
        })
        const normalizedPost = normalize(schemaAll, posts)
        return normalizedPost;
      }

    } catch (error) {
      errorLog(error.message)
    }
  }
}

module.exports = ChatDao;