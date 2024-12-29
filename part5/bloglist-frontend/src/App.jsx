import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const loginUser = async (event) => {
    event.preventDefault()

    try {
      const userToken = await blogService.loginUser({ username, password })
      window.localStorage.setItem('token', JSON.stringify(userToken))
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

  const addBlog = async (event) => {
    event.preventDefault()

    let parsedToken = JSON.parse(user)
    blogService.setToken(parsedToken.token)
    const res = await blogService.addBlog(newBlog)
    let addingNewBlog = blogs
    setBlogs(addingNewBlog.concat(res))
  }

  const updateForm = (event) => {
    event.preventDefault()
    const target = event.target
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  const logOut = () => {
    window.localStorage.removeItem('token')
    setUser(null)
  }

  const gettingBlogs = () => {
    blogService.getBlogs().then((blogRay) => {
      setBlogs(blogRay)
    })
  }

  useEffect(gettingBlogs, [])

  useEffect(() => {
    const browserCred = window.localStorage.getItem('token')
    if (browserCred) {
      setUser(browserCred)
    }
  }, [])

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
          <h3>
            {user.username} logged in <button onClick={logOut}>logout</button>
          </h3>
          <h2>create new</h2>
          <form onSubmit={addBlog}>
            <div>
              title:
              <input
                type='text'
                name='title'
                value={newBlog.title}
                onChange={updateForm}
              />
            </div>
            <div>
              author:
              <input
                type='text'
                name='author'
                value={newBlog.author}
                onChange={updateForm}
              />
            </div>
            <div>
              url:
              <input
                type='text'
                name='url'
                value={newBlog.url}
                onChange={updateForm}
              />
            </div>
            <button type='submit'>create</button>
          </form>
          {blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />
          })}
        </div>
      )}
    </div>
  )
}

export default App
