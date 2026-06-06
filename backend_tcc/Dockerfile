# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer puerto
EXPOSE 5000

# Comando para iniciar
CMD ["npm", "start"]
