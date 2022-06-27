const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Product {
    _id: ID!,
    title: String,
    price: Float,
    imgUrl: String,
  }

  input ProductInput {
    title: String,
    price: Float,
    imgUrl: String,
    code: String,
    description: String,
    stock: Int,
  }

  type Query {
    getAllProducts: [Product],
    getProductById(_id: ID!): Product
  }
  
  type Mutation {
    createProduct(product: ProductInput): Product,
    updateProduct(_id: ID!, product: ProductInput): Product,
    deleteProduct(_id: ID!): Product,
  }
`)

module.exports = schema;