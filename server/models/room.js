const mongoose = require('mongoose');
// const user = require('./user');
// const message = require('./message');

// Модель комнат
const room = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true },
    topic: String,
    users: [{}],
    messages: [{}],
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', room);
