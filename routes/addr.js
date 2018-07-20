const express = require('express');
const router = express.Router();
const User = require('../models/methods')
const mongo = require('mongodb');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Model = require('../models/auth');
const config = require('../config/data')


//post for methods.js
router.post('/creating', (req, res, next) => {
    let newUser = User({

        id: req.body.id,
        studentname: req.body.studentname,
        branch: req.body.branch,
        marks: req.body.marks
    })
    User.create(newUser, (err, User) => {
        if (err) {
            res.json({ success: false, msg: "registration failed" })
        } else {
            res.json({ success: true, msg: " Successful registration" })
        }
    });
});
//post for auth.js
router.post('/adding', (req, res, next) => {
    let newReg = Model({
        name: req.body.name,
        id: req.body.id,
        email: req.body.email,
        password: req.body.password
    })
    Model.create(newReg, (err, model) => {
        if (err) {
            res.json({ success: false, msg: "registration failed" })
        } else {
            res.json({ success: true, msg: " Successful registration" })
        }
    });
});

//authenticate
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    Model.getModelByEmail(email, (err, user) => {
        if (err) { throw err };
        if (!user) {
            res.json("authentication failed");
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {

            }
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 64800
                })
                res.json({
                    success: true,
                    token: 'jwt ' + token,
                    user: {
                        name: user.name,
                        email: user.email,
                        password: user.password

                    }
                })
            }
            else {
                return res.json({ success: false, msg: 'wrong password' });
            }
        })
    })
})

router.get('/over', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user })
})




//get request
router.get('/reading', (req, res) => {
    User.find({}).then(data => {
        res.send(data);
    })
})

router.get('/get/:id', (req, res, next) => {
    const _id = req.params.id;
    User.findById({ _id }).then(data => {
        res.send(data)
    })

})

//patch
router.patch('/updating/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) {
            res.send('ERROR in updating')
        } else {
            user.name = req.body.name;
            user.save();
            res.send(user)
        }
    })
})

//delete
router.delete('/deleting/:id', (req, res) => {
    const id = req.params.id;
    User.findOneAndRemove(id).then(data => {
        res.send(data)
    })
})
module.exports = router;




















