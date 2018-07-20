const mongoose = require('mongoose');
const config = require('../config/data');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const ModelSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const Model = module.exports = mongoose.model('Model', ModelSchema);

module.exports.getModelById = (id, callback) => {
    Model.findById(id, callback);
}

module.exports.getModelByEmail = (email, callback) => {
    const query = { email: email };
    Model.findOne(query, callback);
}

module.exports.create = (newReg, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newReg.password, salt, (err, hash) => {
            if (err) {
                console.log('error');
            }

            newReg.password = hash;
            newReg.save(callback);
        })
    })

}

module.exports.confirmpassword = (data, hash, callback) => {
    bcrypt.compare(data, hash, (err, isMatch) => {
        if (err) {
            console.log('error in comparing password');
        }
        else {
            callback(null, isMatch);
        }
    });
}


