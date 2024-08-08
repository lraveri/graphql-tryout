import { intArg, makeSchema, nonNull, objectType, stringArg, floatArg } from 'nexus';
import { Customer, Order, Product, ProductVariant } from 'nexus-prisma';
import { join } from 'path';

const CustomerType = objectType({
    name: Customer.$name,
    description: Customer.$description,
    definition(t) {
        t.field(Customer.id);
        t.field(Customer.name);
        t.field(Customer.email);
        t.field(Customer.orders);
    },
});

const OrderType = objectType({
    name: Order.$name,
    description: Order.$description,
    definition(t) {
        t.field(Order.id);
        t.field(Order.total);
        t.field(Order.customer);
        t.field(Order.products);
    },
});

const ProductType = objectType({
    name: Product.$name,
    description: Product.$description,
    definition(t) {
        t.field(Product.id);
        t.field(Product.title);
        t.field(Product.description);
        t.field(Product.variants);
        t.field(Product.orders);
    },
});

const ProductVariantType = objectType({
    name: ProductVariant.$name,
    description: ProductVariant.$description,
    definition(t) {
        t.field(ProductVariant.id);
        t.field(ProductVariant.title);
        t.field(ProductVariant.price);
        t.field(ProductVariant.product);
    },
});

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('customers', {
            type: 'Customer',
            resolve(_, __, ctx) {
                return ctx.prisma.customer.findMany();
            },
        });
        t.field('customer', {
            type: 'Customer',
            args: {
                id: nonNull(intArg()),
            },
            resolve(_, { id }, ctx) {
                return ctx.prisma.customer.findUnique({ where: { id } });
            },
        });
        t.nonNull.list.nonNull.field('orders', {
            type: 'Order',
            resolve(_, __, ctx) {
                return ctx.prisma.order.findMany();
            },
        });
        t.field('order', {
            type: 'Order',
            args: {
                id: nonNull(intArg()),
            },
            resolve(_, { id }, ctx) {
                return ctx.prisma.order.findUnique({ where: { id } });
            },
        });
        t.nonNull.list.nonNull.field('products', {
            type: 'Product',
            resolve(_, __, ctx) {
                return ctx.prisma.product.findMany();
            },
        });
        t.field('product', {
            type: 'Product',
            args: {
                id: nonNull(intArg()),
            },
            resolve(_, { id }, ctx) {
                return ctx.prisma.product.findUnique({ where: { id } });
            },
        });
    },
});

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        // Create Customer
        t.field('createCustomer', {
            type: 'Customer',
            args: {
                name: nonNull(stringArg()),
                email: nonNull(stringArg()),
            },
            resolve(_, { name, email }, ctx) {
                return ctx.prisma.customer.create({
                    data: { name, email },
                });
            },
        });

        // Update Customer
        t.field('updateCustomer', {
            type: 'Customer',
            args: {
                id: nonNull(intArg()),
                name: stringArg(),
                email: stringArg(),
            },
            resolve(_, { id, name, email }, ctx) {
                return ctx.prisma.customer.update({
                    where: { id },
                    data: { name, email },
                });
            },
        });

        // Delete Customer
        t.field('deleteCustomer', {
            type: 'Customer',
            args: {
                id: nonNull(intArg()),
            },
            resolve(_, { id }, ctx) {
                return ctx.prisma.customer.delete({
                    where: { id },
                });
            },
        });

        // Similarly, you can add mutations for Order, Product, and ProductVariant
        // Create Order
        t.field('createOrder', {
            type: 'Order',
            args: {
                total: nonNull(floatArg()),
                customerId: nonNull(intArg()),
            },
            resolve(_, { total, customerId }, ctx) {
                return ctx.prisma.order.create({
                    data: {
                        total,
                        customer: { connect: { id: customerId } },
                    },
                });
            },
        });

        // Update Order
        t.field('updateOrder', {
            type: 'Order',
            args: {
                id: nonNull(intArg()),
                total: floatArg(),
                customerId: intArg(),
            },
            resolve(_, { id, total, customerId }, ctx) {
                return ctx.prisma.order.update({
                    where: { id },
                    data: {
                        total,
                        customer: customerId ? { connect: { id: customerId } } : undefined
                    },
                });
            },
        });

        // Delete Order
        t.field('deleteOrder', {
            type: 'Order',
            args: {
                id: nonNull(intArg()),
            },
            resolve(_, { id }, ctx) {
                return ctx.prisma.order.delete({
                    where: { id },
                });
            },
        });

        // Add similar create, update, and delete mutations for Product and ProductVariant as needed
    },
});

export const schema = makeSchema({
    types: [Query, Mutation, CustomerType, OrderType, ProductType, ProductVariantType],
    outputs: {
        typegen: join(__dirname, '..', 'nexus-typegen.ts'),
        schema: join(__dirname, '..', 'schema.graphql'),
    },
});
