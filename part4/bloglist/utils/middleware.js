const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'validation error' })
  } else if (
    err.name === 'MongoServerError' &&
    err.errorResponse.errmsg.includes('E11000 duplicate key error')
  ) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' })
  }
  next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
}
