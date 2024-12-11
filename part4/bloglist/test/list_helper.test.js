const { test, describe } = require('node:test')
const assert = require('node:assert')
const {
  dummy,
  totalLike,
  favoriteBlog,
  mostBlogs,
} = require('../utils/list_helper')
const { blogs } = require('./blog')

test('dummy return 1 ', () => {
  const result = dummy([1, 2, 3, 4])
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(totalLike([]), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const oneList = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
      },
    ]
    assert.strictEqual(totalLike(oneList), 7)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(totalLike(blogs), 36)
  })
})

describe('most likes', () => {
  test('most liked blog from a blog list', () => {
    assert.deepStrictEqual(favoriteBlog(blogs), {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('most blogs', () => {
  test('most written blogs by one author', () => {
    assert.deepStrictEqual(mostBlogs(blogs), {
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})
