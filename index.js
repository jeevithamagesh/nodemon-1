const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const config = require('./config/data');

//instance
const app = express();
app.use(bodyparser.json());

//connection to database
mongoose.connect('mongodb://localhost:27017/nodemon', { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('connected to mongodb');
})

mongoose.connection.on('err', () => {
    console.log('there is error');
})

const addr = require('./routes/addr')
app.use('/addr', addr);

app.get('/', function (req, res) {
    console.log('this is a get request');
    res.send('this is a get request');
})

//port
app.listen(3000, () => {
    console.log('server started on port 3000');
})