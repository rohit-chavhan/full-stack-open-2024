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

module.exports = { dummy, totalLike, favoriteBlog }
