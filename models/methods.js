const mongoose = require('mongoose');
const confif = require('../config/data');

const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema);
