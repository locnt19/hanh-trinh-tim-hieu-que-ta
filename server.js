const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const path = require('path')
const logger = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('req-flash')
const favicon = require('serve-favicon')

const app = express()
const http = require('http').Server(app)

const port = process.env.PORT || 3000

const routes = require('./src/routes')

// database connection
require('./src/config/database')

// models
require('./src/models/User')

// view engine setup
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
// configure body parser for AJAX requests
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // extended: false can not send 'nested object'
app.use(cookieParser())
app.use(session({
  secret: process.env.SECRETKEY,
  resave: true,
  saveUninitialized: true,
  maxAge: 60 * 60 * 1000
}))
app.use(flash({ locals: 'flash' }))
app.use(cors()) // enable cross-site HTTP requests
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))


// routes
app.use(routes)

// bootstrap server
const server = http.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})