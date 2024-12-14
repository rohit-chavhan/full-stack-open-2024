const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const updateBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, updateBlog, { new: true })
    .then((updateCont) => response.json(updateCont))
    .catch((err) => next(err))
})

module.exports = blogsRouter
