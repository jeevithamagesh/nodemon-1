const express = require('express');
const router = express.Router();
const User = require('../models/methods')
const mongo = require('mongodb');

router.post('/creating', (req, res, next) => {
    let newUser = User({
        name: req.body.name,
        id: req.body.id
    })
    User.create(newUser, (err, User) => {
        if (err) {
            res.json({ success: false, msg: "registration failed" })
        } else {
            res.json({ success: true, msg: " Successful registration" })
        }
    });
});

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


router.delete('/deleting/:id', (req, res) => {
    const id = req.params.id;
    User.findOneAndRemove(id).then(data => {
        res.send(data)
    })
})
module.exports = router;




















