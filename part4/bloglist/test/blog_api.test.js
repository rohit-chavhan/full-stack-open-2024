/*
 */
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

  test.only('blog count increase by one', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogCount = await api.get('/api/blogs')
    const x = await api.get('/api/blogs')
    console.log(x.body)
    assert.strictEqual(blogCount.body.length, 2)
  })

  test.only('added blog is returned in blog list', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')
    const blogList = await blogs.body.map((b) => b.title)
    console.log('blogs.body ==> ', blogs.body)
    console.log('blogList ==> ', blogList)
    assert(blogList.includes('new blog using ai'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
