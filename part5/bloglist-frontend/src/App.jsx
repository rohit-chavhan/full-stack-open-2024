import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  const loginUser = async (event) => {
    event.preventDefault()

    try {
      const userToken = await blogService.loginUser({ username, password })
      setUser(userToken)
      setUsername('')
      setPassword('')
    } catch (err) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getBlogs().then((blogRay) => setBlogs(blogRay))
  }, [user])

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <form onSubmit={loginUser}>
            <div>
              username
              <input
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type='password'
                value={password}
                name={'Password'}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Blog</h1>
          <h3>{user.username} logged in</h3>
          {blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />
          })}
        </div>
      )}
    </div>
  )
}

export default App
