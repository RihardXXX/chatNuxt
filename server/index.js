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
app.get('/server', function(req, res) {
    res.status(200).json({
        test: 'test',
    });
});

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

// Запуск приложения.
start();
