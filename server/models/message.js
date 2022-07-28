const mongoose = require('mongoose');
const Room = require('./room');
const User = require('./user');

// Модель сообщений
const message = new mongoose.Schema({
    room: Room,
    user: User,
    message_body: String,
    message_status: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', message);
