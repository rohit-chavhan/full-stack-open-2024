const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(cors())

const mongoUrl = MONGODB_URI
mongoose.connect(mongoUrl)

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).end()
  }
  return next(err)
}

app.use(errorHandler)

module.exports = app
