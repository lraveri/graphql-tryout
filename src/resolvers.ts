import { Context } from './context';
import {UserInputError} from "apollo-server";

export const resolvers = {
    Query: {
        customers: async (_: any, __: any, { prisma }: Context) => {
            return prisma.customer.findMany();
        },
        customer: async (_: any, { id }: { id: number }, { prisma }: Context) => {
            const customer = await prisma.customer.findUnique({
                where: { id },
            });

            if (!customer) {
                throw new UserInputError(`Customer with ID ${id} not found`, {
                    invalidArgs: { id },
                });
            }

            return customer;
        },
        orders: async (_: any, __: any, { prisma }: Context) => {
            return prisma.order.findMany();
        },
        order: async (_: any, { id }: { id: number }, { prisma }: Context) => {
            return prisma.order.findUnique({
                where: { id },
            });
        },
        products: async (_: any, __: any, { prisma }: Context) => {
            return prisma.product.findMany();
        },
        product: async (_: any, { id }: { id: number }, { prisma }: Context) => {
            return prisma.product.findUnique({
                where: { id },
            });
        },
    },
    Mutation: {
        createCustomer: async (_: any, { name, email }: { name: string, email: string }, { prisma }: Context) => {
            return prisma.customer.create({
                data: { name, email },
            });
        },
        updateCustomer: async (_: any, { id, name, email }: { id: number, name?: string, email?: string }, { prisma }: Context) => {
            return prisma.customer.update({
                where: { id },
                data: { name, email },
            });
        },
        deleteCustomer: async (_: any, { id }: { id: number }, { prisma }: Context) => {
            return prisma.customer.delete({
                where: { id },
            });
        },

        createOrder: async (_: any, { total, customerId }: { total: number, customerId: number }, { prisma }: Context) => {
            return prisma.order.create({
                data: { total, customerId },
            });
        },
        updateOrder: async (_: any, { id, total, customerId }: { id: number, total?: number, customerId?: number }, { prisma }: Context) => {
            return prisma.order.update({
                where: { id },
                data: { total, customerId },
            });
        },
        deleteOrder: async (_: any, { id }: { id: number }, { prisma }: Context) => {
            return prisma.order.delete({
                where: { id },
            });
        },

        createProduct: async (_: any, { title, description }: { title: string, description: string }, { prisma }: Context) => {
            return prisma.product.create({
                data: { title, description },
            });
        },
        updateProduct: async (_: any, { id, title, description }: { id: number, title?: string, description?: string }, { prisma }: Context) => {
            return prisma.product.update({
                where: { id },
                data: { title, description },
            });
        },
        deleteProduct: async (_: any, { id }: { id: number }, { prisma }: Context) => {
            return prisma.product.delete({
                where: { id },
            });
        },

        createProductVariant: async (_: any, { productId, title, price }: { productId: number, title: string, price: number }, { prisma }: Context) => {
            return prisma.productVariant.create({
                data: { productId, title, price },
            });
        },
        updateProductVariant: async (_: any, { id, title, price }: { id: number, title?: string, price?: number }, { prisma }: Context) => {
            return prisma.productVariant.update({
                where: { id },
                data: { title, price },
            });
        },
        deleteProductVariant: async (_: any, { id }: { id: number }, { prisma }: Context) => {
            return prisma.productVariant.delete({
                where: { id },
            });
        },
    },
    Customer: {
        orders: async (parent: any, __: any, { prisma }: Context) => {
            return prisma.order.findMany({
                where: { customerId: parent.id },
            });
        },
    },
    Order: {
        customer: async (parent: any, __: any, { prisma }: Context) => {
            return prisma.customer.findUnique({
                where: { id: parent.customerId },
            });
        },
        products: async (parent: any, __: any, { prisma }: Context) => {
            return prisma.product.findMany({
                where: {
                    orders: {
                        some: {
                            id: parent.id,
                        },
                    },
                },
            });
        },
    },
    Product: {
        variants: async (parent: any, __: any, { prisma }: Context) => {
            return prisma.productVariant.findMany({
                where: { productId: parent.id },
            });
        },
    },
};
