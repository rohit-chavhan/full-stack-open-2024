const _ = require('lodash')

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

  return (obj = {
    author: _.last(prop),
    blogs: _.last(vals),
  })
}

const mostLikes = (blogs) => {
  const k = blogs.reduce((accu, cur) => {
    if (Object.hasOwn(accu, cur.author)) {
      accu[cur.author] += cur.likes
      return accu
    } else {
      accu[cur.author] = cur.likes
      return accu
    }
  }, {})

  let value = 0
  let objs = {}

  for (let key in k) {
    let vals = k[key]
    if (vals > value) {
      objs = { [key]: vals }
      value = vals
    }
  }

  let run = {}
  for (const j in objs) {
    run.author = j
    run.likes = objs[j]
  }
  return run
}

module.exports = { dummy, totalLike, favoriteBlog, mostBlogs, mostLikes }
