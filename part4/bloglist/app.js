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

module.exports = app
