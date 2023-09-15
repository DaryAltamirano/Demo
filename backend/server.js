'use strict'

const express = require('express')
const config = require('./config.js')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models/index.js");
db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Hola a todos')
}) 

app.listen(config.PORT)
console.log(`Run Server port: ${config.PORT} `)