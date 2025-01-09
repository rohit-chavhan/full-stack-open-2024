import axios from 'axios'

let token = null

const setToken = (newToken) => (token = `Bearer ${newToken}`)

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

const addBlog = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post('/api/blogs', newObj, config)

  return response.data
}

const updateBlog = async (newObj, id) => {
  console.log('newObj, id ==> ', newObj, id)
  const response = await axios.put(`/api/blogs/${id}`, newObj)
  return response.data
}

export default { getBlogs, getUser, loginUser, setToken, addBlog, updateBlog }
