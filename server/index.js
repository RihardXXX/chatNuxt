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

// const MongoClient = require('mongodb').MongoClient;
// const app = require('express')();
// const port = process.env.PORT || 8000;
// const pathMongo = 'mongodb://localhost:27017/myapi';
// // eslint-disable-next-line no-unused-vars
// let db;
//
// app.get('/server', (req, res) => {
//     res.send('Hello World! test');
// });
//
// MongoClient.connect(pathMongo, function(err, database) {
//     if (err) {
//         return console.log(err);
//     }
//     db = database;
//     app.listen(port, function() {
//         console.log('database: ', database);
//         console.log('API app started Mongo');
//     });
// });

// =====

// start mongo server local brew install mongodb-community

// async function start() {
//     // We get Nuxt instance
//     const nuxt = await loadNuxt(isDev ? 'dev' : 'start');
//
//     // Render every route with Nuxt
//     // app.use(nuxt.render);
//     app.get('/server', (req, res) => {
//         res.send('Hello World! test');
//     });
//
//
//     // Build only in dev mode with hot-reloading
//     if (isDev) {
//         build(nuxt);
//     }
//     // Listen the server
//     MongoClient.connect(pathMongo, function(err, database) {
//         if (err) {
//             return console.log(err);
//         }
//         db = database;
//         app.listen(port, function() {
//             console.log('API app started Mongo');
//         });
//     });
// }
//
// start();
