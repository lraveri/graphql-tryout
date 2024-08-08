docker-compose exec app sh

npx prisma migrate dev --name init

docker-compose logs app

docker-compose exec db psql -U user -d mydatabase

\dt

npx ts-node prisma/seeders/seed.ts
