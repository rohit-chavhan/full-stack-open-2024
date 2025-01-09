import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notify from './components/Notify'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Input from './components/Input'

const App = () => {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [notify, setNotify] = useState(null)

  useEffect(() => {
    const browserCred = window.localStorage.getItem('token')
    if (browserCred) {
      setUser(browserCred)
    }
  }, [])

  const gettingBlogs = () => {
    blogService.getBlogs().then((blogRay) => {
      setBlogs(blogRay)
    })
  }

  useEffect(gettingBlogs, [])

  const loginUser = async (event) => {
    event.preventDefault()

    try {
      const userToken = await blogService.loginUser({ username, password })
      console.log('userToken ==> ', userToken)
      window.localStorage.setItem('token', JSON.stringify(userToken))
      setUser(userToken)
      setUsername('')
      setPassword('')
    } catch (err) {
      setNotify('wrong username or password')
      notifyTimer()
    }
  }

  const notifyTimer = () => {
    setTimeout(() => {
      setNotify(null)
    }, 4000)
  }

  const logOut = () => {
    window.localStorage.removeItem('token')
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    let parsedToken = JSON.parse(user)
    blogService.setToken(parsedToken.token)

    const res = await blogService.addBlog(newBlog)
    let addingNewBlog = blogs

    setBlogs(addingNewBlog.concat(res))
    setNotify(newBlog)
    notifyTimer()
  }

  return (
    <div>
      <Notify value={notify} />
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <form onSubmit={loginUser}>
            <div>
              username
              <Input
                title={'Username'}
                value={username}
                update={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <Input
                title={'Password'}
                value={password}
                update={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Blog</h1>
          <h3>
            {JSON.parse(user).username} logged in{' '}
            <button onClick={logOut}>logout</button>
          </h3>
          <BlogForm addBlog={addBlog} />
          {blogs.map((blog) => {
            return (
              <Blog
                key={blog.id}
                id={blog.id}
                blog={blog}
                updateLikes={blogService.updateBlog}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
