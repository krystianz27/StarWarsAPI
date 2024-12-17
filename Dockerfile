# # PROD
# # Pobranie obrazu Node.js
# FROM node:18

# # Ustawienie katalogu roboczego
# WORKDIR /app

# # Skopiowanie plików package.json i package-lock.json
# COPY package*.json ./

# # Instalacja zależności
# RUN npm install

# # Skopiowanie całej aplikacji
# COPY . .

# # Kompilacja TypeScript (jeśli potrzebne)
# RUN npm run build

# # Expose port aplikacji
# EXPOSE 3000

# # Uruchomienie aplikacji
# CMD ["npm", "start"]

##############################################################

# DEV
# Pobranie obrazu Node.js
FROM node:18

# Ustawienie katalogu roboczego
WORKDIR /app

# Skopiowanie plików package.json i package-lock.json
COPY package*.json ./

# Instalacja zależności, w tym nodemon i ts-node
RUN npm install

# Instalacja globalnie narzędzi do uruchamiania TS
RUN npm install ts-node typescript

# Skopiowanie całej aplikacji
COPY . .

# Expose port aplikacji
EXPOSE 3000

# Komenda domyślna - uruchomienie aplikacji z nodemon
CMD ["npm", "run", "dev"]

