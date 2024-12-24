const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blog')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(cors())

const mongoUrl = MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => console.log('connect to mongo db'))
  .catch((err) => console.log(err))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
