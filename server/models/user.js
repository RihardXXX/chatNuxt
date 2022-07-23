const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'поле имени обязательно для заполнения'],
        match: [/^[a-zA-Z0-9]+$/, 'пожалуйста введите валидное имя пользователя'],
        index: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'поле электронной почты обязательно для заполнения'],
        match: [/\S+@\S+\.\S+/, 'введите валидную электронную почту'],
        index: true,
    },
    password: {
        type: String,
        required: [true, 'пароль является обязательным полем для заполнения'],
    },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'такое имя или электронная почта уже существует' });

module.exports = mongoose.model('User', UserSchema);