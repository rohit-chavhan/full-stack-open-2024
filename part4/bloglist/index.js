const config = require('./utils/config')
const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')

app.use('/api/blogs', blogsRouter)
app.use(cors())
app.use(express.json())

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
