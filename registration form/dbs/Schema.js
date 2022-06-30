const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    }
});

const model = new mongoose.model('RegisterData', Schema);

module.exports = model;