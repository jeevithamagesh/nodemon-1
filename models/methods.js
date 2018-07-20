const mongoose = require('mongoose');
const config = require('../config/data');

const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    studentname: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema);
