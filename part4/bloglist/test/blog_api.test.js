const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const Blog = require('../models/blog')
const { usersInDb } = require('./test_helper')
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

describe.only('adding a new blog', () => {
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
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbHViaGEiLCJpZCI6IjY3NjhmZDFlN2E0NDU2ZWI4OGZmNTViMSIsImlhdCI6MTczNDkzNTU1Mn0.BU_nf3IxtSKQUe5xSW2gEF3tbUE_yTuH4n1h6jlrZ_M'
      )
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogCount = await api.get('/api/blogs')
    assert.strictEqual(blogCount.body.length, 2)
  })

  test('adding blow wihout token fails', async () => {
    await api.post('/api/blogs').send(newBlog).expect(401)
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

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('rohit', 10)
    const user = new User({ username: 'karan', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const userAtStart = await usersInDb()

    const newUser = {
      username: 'nucleya',
      name: 'vivian divine',
      password: 'gully gang',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const userAtEnd = await usersInDb()

    assert.strictEqual(userAtEnd.length, userAtStart.length + 1)

    const usernames = userAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const userAtStart = await usersInDb()

    const newUser = {
      username: 'karan',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const userAtEnd = await usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(userAtEnd.length, userAtStart.length)
  })

  test('gives error for username and passowrd field for 3 characters long', async () => {
    const userAtStart = await usersInDb()

    const newUser = {
      username: 'on',
      password: 'x',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(400)

    const userAtEnd = await usersInDb()
    assert(result.body.error.includes('validation error'))
    assert.strictEqual(userAtEnd.length, userAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
