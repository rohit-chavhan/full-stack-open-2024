import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

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

const getConfig = () => {
  return {
    headers: { Authorization: token },
  }
}

const addBlog = async (newObj) => {
  const config = getConfig()

  const response = await axios.post('/api/blogs', newObj, config)

  return response.data
}

const updateBlog = async (newObj, id) => {
  const response = await axios.put(`/api/blogs/${id}`, newObj)
  return response.data
}

const deleteBlog = async (id) => {
  const config = getConfig()

  const response = await axios.delete(`/api/blogs/${id}`, config)
  return response.data
}

export default {
  getBlogs,
  getUser,
  loginUser,
  setToken,
  addBlog,
  updateBlog,
  deleteBlog,
}
