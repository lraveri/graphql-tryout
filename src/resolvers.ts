import customersData from './data/customers.json';
import ordersData from './data/orders.json';
import productsData from './data/products.json';

interface Customer {
    id: number;
    name: string;
    email: string;
    orders: number[];
}

interface Order {
    id: number;
    total: number;
    customerId: number;
    products: number[];
}

interface Product {
    id: number;
    title: string;
    description: string;
    variants: any[];
}

const customers: Customer[] = customersData;
const orders: Order[] = ordersData;
const products: Product[] = productsData;

export const resolvers = {
    Query: {
        customers: () => customers,
        customer: (_: any, { id }: { id: number }) => customers.find(customer => customer.id === id),
        orders: () => orders,
        order: (_: any, { id }: { id: number }) => orders.find(order => order.id === id),
        products: () => products,
        product: (_: any, { id }: { id: number }) => products.find(product => product.id === id),
    },
    Customer: {
        orders: (parent: any) => orders.filter(order => parent.orders.includes(order.id)),
    },
    Order: {
        customer: (parent: any) => customers.find(customer => customer.id === parent.customerId),
        products: (parent: any) => products.filter(product => parent.products.includes(product.id)),
    },
    Product: {
        variants: (parent: any) => parent.variants,
    },
};
