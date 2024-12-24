const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor, tokenExtractor } = require('../utils/tokenFuncs')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blog = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (request, response, next) => {
    try {
      const body = request.body

      if (!request.token) {
        return response
          .status(401)
          .json({ error: 'unauthorized or token invalid' })
      }

      const user = await User.findById(request.user.id)

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id,
      })

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog)
    } catch (err) {
      next(err)
    }
  }
)

blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== user.id) {
      return response.status(403).json({ error: 'unauthorized' })
    }

    if (blog.user.toString() === user.id) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    }
  }
)

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
