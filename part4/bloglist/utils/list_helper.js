const dummy = (blogs) => 1

const totalLike = (blogs) => {
  if (blogs.length === 0) return 0
  return blogs.reduce((accu, currentValue) => {
    return accu + currentValue.likes
  }, 0)
}

module.exports = { dummy, totalLike }
