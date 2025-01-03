import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notify from './components/Notify'
import blogService from './services/blogs'

const App = () => {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [notify, setNotify] = useState(null)
  const [displayAddBlog, setDisplayAddBlog] = useState(false)

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

  const addBlog = async (event) => {
    event.preventDefault()

    console.log('user ==> ', user)
    let parsedToken = JSON.parse(user)
    blogService.setToken(parsedToken.token)
    const res = await blogService.addBlog(newBlog)
    let addingNewBlog = blogs
    setBlogs(addingNewBlog.concat(res))
    setNotify(newBlog)
    notifyTimer()
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

  const newBlogForm = () => {
    let hideForm = { display: displayAddBlog ? '' : 'none' }
    let showForm = { display: displayAddBlog ? 'none' : '' }

    const hideFormClick = () => setDisplayAddBlog(false)

    return (
      <div>
        <div style={showForm}>
          <button onClick={() => setDisplayAddBlog(true)}>new blog</button>
        </div>
        <div style={hideForm}>
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
            <button type='submit' onClick={hideFormClick}>
              create
            </button>
            <button onClick={hideFormClick}>cancel</button>
          </form>
        </div>
      </div>
    )
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
          {console.log('user ==> ', JSON.parse(user))}
          <h1>Blog</h1>
          <h3>
            {JSON.parse(user).username} logged in{' '}
            <button onClick={logOut}>logout</button>
          </h3>
          {newBlogForm()}
          {blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />
          })}
        </div>
      )}
    </div>
  )
}

export default App
