# Этап установки зависимостей и сборки
FROM node:18 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Сборка Next.js приложения
RUN npm run build

# Устанавливаем production-only зависимости
RUN npm prune --production

# Этап запуска
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем собранные файлы из builder этапа
COPY --from=builder /app ./

# Открываем порт для приложения
EXPOSE 3000

# Команда запуска приложения
CMD ["npm", "start"]
