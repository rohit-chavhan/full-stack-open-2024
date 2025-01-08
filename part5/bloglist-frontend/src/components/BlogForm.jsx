import { useState } from 'react'
import Input from './Input'

const BlogForm = ({ addBlog }) => {
  const initailBlog = { title: '', author: '', url: '' }
  const [newBlog, setNewBlog] = useState(initailBlog)
  const [displayAddBlog, setDisplayAddBlog] = useState(false)

  let hideForm = { display: displayAddBlog ? '' : 'none' }
  let showForm = { display: displayAddBlog ? 'none' : '' }

  const hideFormClick = () => {
    setDisplayAddBlog(false)
  }

  const updateForm = (event) => {
    event.preventDefault()
    const target = event.target
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  return (
    <div>
      <div style={showForm}>
        <button onClick={() => setDisplayAddBlog(true)}>new blog</button>
      </div>
      <div style={hideForm}>
        <h2>create new</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            addBlog(newBlog)
            setNewBlog(initailBlog)
          }}
        >
          <div>
            title:
            <Input title='title' value={newBlog.title} update={updateForm} />
          </div>
          <div>
            author:
            <Input title='author' value={newBlog.author} update={updateForm} />
          </div>
          <div>
            url:
            <Input title='url' value={newBlog.url} update={updateForm} />
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

export default BlogForm
