const jwt = require('jsonwebtoken')
require('dotenv').config()

const tokenExtractor = (request, response, next) => {
  let authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }

  next()
}

const userExtractor = (request, response, next) => {
  if (!request.token) {
    request.user = null
  } else {
    const decode = jwt.verify(request.token, process.env.SECRET)
    request.user = decode
  }
  next()
}

module.exports = { userExtractor, tokenExtractor }
