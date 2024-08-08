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
`;
