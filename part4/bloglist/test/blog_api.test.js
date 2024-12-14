const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let newBlog = new Blog({
    title: 'foo bar',
    author: 'sundar',
    url: 'http://example.com',
    likes: 12,
  })
  await newBlog.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there is one blog', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 1)
})

test('there is string id ', async () => {
  const res = await api.get('/api/blogs')
  const checkid = res.body[0].id
  assert.strictEqual('string', typeof checkid)
})

describe('adding a new blog', () => {
  const newBlog = {
    title: 'new blog using ai',
    author: 'kafka raska',
    url: 'reson.com',
    likes: 12000,
  }

  test('blog count increase by one', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogCount = await api.get('/api/blogs')
    const x = await api.get('/api/blogs')
    assert.strictEqual(blogCount.body.length, 2)
  })

  test('added blog is returned in blog list', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')
    const blogList = await blogs.body.map((b) => b.title)
    assert(blogList.includes('new blog using ai'))
  })
})

test('like property default to 0', async () => {
  const newBlog = {
    title: 'no likes',
    author: 'bansals in the house',
    url: 'lenskart.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  const noLikesBlog = res.body.find((blog) => blog.title === 'no likes')

  assert(noLikesBlog.likes === 0)
})

test('without url blog is not added', async () => {
  const newBlog = {
    title: 'no url blog',
    author: 'rohit',
    likes: 34,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const res = await api.get('/api/blogs')

  assert(res.body.length === 1)
})

test('deleting a single blog', async () => {
  const getId = await api.get('/api/blogs')
  const Id = getId.body[0].id

  await api.delete(`/api/blogs/${Id}`).expect(204)

  const res = await api.get('/api/blogs')
  assert(res.body.length === 0)
})

test('updating likes of blog', async () => {
  const blog = {
    likes: 500,
  }

  const getId = await api.get('/api/blogs')

  const Id = getId.body[0].id

  await api.put(`/api/blogs/${Id}`).send(blog)

  const req = await api.get('/api/blogs')
  const body = req.body[0]

  assert(body.likes === blog.likes)
})

after(async () => {
  await mongoose.connection.close()
})
