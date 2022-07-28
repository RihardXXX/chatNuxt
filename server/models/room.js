const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');

// Модель комнат
const room = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true },
    topic: String,
    users: [User],
    messages: [Message],
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', room);
