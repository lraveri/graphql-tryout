#run migration
docker-compose exec app sh

npx prisma migrate dev --name init

#verify the migration
docker-compose exec db psql -U user -d mydatabase

\dt

#seed the database
docker-compose exec app sh

npx ts-node prisma/seeders/seed.ts

#verify the seed
docker-compose exec db psql -U user -d mydatabase

SELECT * FROM "Customer";
SELECT * FROM "Order";
SELECT * FROM "Product";
SELECT * FROM "ProductVariant";
