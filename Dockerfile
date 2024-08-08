# Usa l'immagine ufficiale di Node.js
FROM node:20

# Imposta la directory di lavoro
WORKDIR /app

# Copia package.json e package-lock.json (se presente)
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia il resto dei file dell'applicazione
COPY . .

# Genera Prisma Client
RUN npx prisma generate

# Compila il codice TypeScript
RUN npm run build

# Esponi la porta su cui girerà l'applicazione
EXPOSE 4000

# Comando per avviare l'applicazione
CMD ["npm", "start"]
