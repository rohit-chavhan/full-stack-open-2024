import axios from 'axios'

const getBlogs = async () => {
  const response = await axios.get('/api/blogs')
  return response.data
}

const getUser = async () => {
  const response = axios.get('/api/users')
  return await response.data
}

const loginUser = async (credentials) => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

export default { getBlogs, getUser, loginUser }
