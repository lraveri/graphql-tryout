import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Customer {
    id: Int
    name: String
    email: String
    orders: [Order]
  }

  type Order {
    id: Int
    total: Float
    customer: Customer
    products: [Product]
  }

  type Product {
    id: Int
    title: String
    description: String
    variants: [ProductVariant]
  }

  type ProductVariant {
    id: Int
    title: String
    price: Float
  }

  type Query {
    customers: [Customer]
    customer(id: Int!): Customer
    orders: [Order]
    order(id: Int!): Order
    products: [Product]
    product(id: Int!): Product
  }

  type Mutation {
    createCustomer(name: String!, email: String!): Customer
    updateCustomer(id: Int!, name: String, email: String): Customer
    deleteCustomer(id: Int!): Customer

    createOrder(total: Float!, customerId: Int!): Order
    updateOrder(id: Int!, total: Float, customerId: Int): Order
    deleteOrder(id: Int!): Order

    createProduct(title: String!, description: String!): Product
    updateProduct(id: Int!, title: String, description: String): Product
    deleteProduct(id: Int!): Product

    createProductVariant(productId: Int!, title: String!, price: Float!): ProductVariant
    updateProductVariant(id: Int!, title: String, price: Float): ProductVariant
    deleteProductVariant(id: Int!): ProductVariant
  }
`;
