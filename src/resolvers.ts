import { Context } from './context';

export const resolvers = {
    Query: {
        customers: async (_: any, __: any, { prisma }: Context) => {
            return prisma.customer.findMany();
        },
        customer: async (_: any, { id }: { id: number }, { prisma }: Context) => {
            return prisma.customer.findUnique({
                where: { id },
            });
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
