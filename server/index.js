require('dotenv').config();

// Подключаем бэкенд на Express.
const express = require('express');
const app = express();
app.use(express.json());

// Подключаем Mongoose и делаем коннект к базе данных.
// Прописываем стандартные настройки Mongoose.
const mongoose = require('mongoose');
// mongoose.Schema.Types.Boolean.convertToFalse.add("");
mongoose.connect(`mongodb://localhost/${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Подключаем маршруты для управления моделью Page.
// импорт роутов
const authorizationRouter = require('./authorizationRouter');
const chatRouter = require('./chatRouter');
app.use('/authorization', authorizationRouter);
app.use('/chat', chatRouter);

// тут начинается магия работы сервера
const { loadNuxt, build } = require('nuxt');
const isDev = process.env.NODE_ENV !== 'production';

async function start() {
    const nuxt = await loadNuxt(isDev ? 'dev' : 'start');

    app.use(nuxt.render);

    if (isDev) {
        build(nuxt);
    }
    app.listen(process.env.PORT);
    console.log('start server rihard xxx');
}


mongoose.connection.on('connected', () => {
    // запуск сервера после подключения к БД
    // при билде обязательно сменить путь в файле вендорс файлу normalize.css
    // Запуск приложения.
    start();
});
