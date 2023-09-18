'use strict'

const express = require('express')
const morgan = require("morgan")
const cors = require('cors');
const config = require('../config/config.js')
const usersRouter = require("../routers/usersRouter.js")
const tokensRouter = require("../routers/tokensRouter.js")
const http = require('http');
const app = express()

app.use(morgan("dev"))
app.use(cors({ origin: config.ORIGIN_REQUEST }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
})

app.use("/api/v1", usersRouter)
app.use("/api/v1", tokensRouter)

const server = http.createServer(app);

require('../http/socket.js')(server);

server.listen(config.PORT, () => {
  console.log(`Run Server port: ${config.PORT} `)
})
