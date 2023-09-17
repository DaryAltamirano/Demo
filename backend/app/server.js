'use strict'

const express = require('express')
const morgan = require("morgan")
const cors = require('cors');
const config = require('../config/config.js')
const router = require("../routers/index.js")

const app = express()

app.use(morgan("dev"))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {            
    res.send('Hello people')                             
}) 

app.use("/api/v1", router)

app.listen(config.PORT, () => {
        console.log(`Run Server port: ${config.PORT} `)
    })
