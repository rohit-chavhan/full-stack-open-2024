const _ = require('lodash')
// const { blogs } = require('../test/blog')

const dummy = (blogs) => 1

const totalLike = (blogs) => {
  if (blogs.length === 0) return 0
  return blogs.reduce((accu, currentValue) => {
    return accu + currentValue.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const mostLike = blogs.reduce(
    (accu, nextValue) => (nextValue.likes > accu.likes ? nextValue : accu),
    blogs[0]
  )
  const { _id, url, __v, ...filterBlog } = mostLike
  return filterBlog
}

const mostBlogs = (blogs) => {
  let x = _.countBy(blogs, 'author')
  let prop = Object.keys(x)
  let vals = Object.values(x)

  const obj = {
    author: prop[_.lastIndexOf(prop) - 1],
    blogs: vals[_.lastIndexOf(prop) - 1],
  }
  return obj
}

module.exports = { dummy, totalLike, favoriteBlog, mostBlogs }
