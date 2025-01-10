import { useState } from 'react'

const Blog = ({ id, blog, updateLikes, deleteBlog }) => {
  console.log('blog ==> ', blog)
  const [showDetails, setShowDetails] = useState(false)
  const [likes, incrementLikes] = useState(blog.likes)

  let detailsShow = { display: showDetails ? '' : 'none' }
  let detailsHide = { display: showDetails ? 'none' : '' }

  const makeItTru = () => {
    setShowDetails(true)
  }

  const makeItFal = () => {
    setShowDetails(false)
  }

  const divStyle = {
    margin: '10px 0px',
    border: '1px solid black',
    padding: '10px',
    borderRight: '',
  }

  const btnStylus = {
    color: 'white',
    backgroundColor: 'blue',
    border: '1px solid solid',
    borderRadius: '3px',
  }

  const updateLike = () => {
    blog.likes += 1
    updateLikes(blog, id)
    incrementLikes(blog.likes)
  }

  const delteBlog = () => {
    let promptUser = confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (promptUser) {
      deleteBlog(id)
    }
  }

  return (
    <div style={divStyle}>
      <div style={detailsHide}>
        {blog.title} by {blog.author} <button onClick={makeItTru}>show</button>
      </div>
      <div style={detailsShow}>
        <p>
          {blog.title} <button onClick={makeItFal}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes {likes} <button onClick={updateLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button style={btnStylus} onClick={delteBlog}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
