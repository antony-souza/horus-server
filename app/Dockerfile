# Use a imagem oficial do Node.js
FROM node:latest

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta que o NestJS escuta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
