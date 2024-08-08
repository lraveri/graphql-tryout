import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.customer.create({
        data: {
            name: 'John Doe',
            email: 'john@example.com',
            orders: {
                create: [
                    {
                        total: 69.98,
                        products: {
                            connectOrCreate: [
                                {
                                    where: { id: 1 },
                                    create: { title: 'T-shirt', description: 'Cotton T-shirt' },
                                },
                                {
                                    where: { id: 2 },
                                    create: { title: 'Jeans', description: 'Blue jeans' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    await prisma.customer.create({
        data: {
            name: 'Jane Smith',
            email: 'jane@example.com',
            orders: {
                create: [
                    {
                        total: 75.0,
                        products: {
                            connectOrCreate: [
                                {
                                    where: { id: 1 },
                                    create: { title: 'T-shirt', description: 'Cotton T-shirt' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    await prisma.product.create({
        data: {
            title: 'T-shirt',
            description: 'Cotton T-shirt',
            variants: {
                create: { title: 'Small', price: 19.99 },
            },
        },
    });

    await prisma.product.create({
        data: {
            title: 'Jeans',
            description: 'Blue jeans',
            variants: {
                create: { title: 'Medium', price: 49.99 },
            },
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
