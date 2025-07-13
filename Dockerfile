# Используем официальный Node.js образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем TypeScript в JS
RUN npm run build

# Указываем переменные окружения (можно переопределить при запуске)
ENV NODE_ENV=production

# Открываем порт (тот же, что в .env)
EXPOSE 5000

# Запускаем приложение
CMD ["npm", "start"]