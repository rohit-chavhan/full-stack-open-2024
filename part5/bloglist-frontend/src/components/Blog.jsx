import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  let detailsShow = { display: showDetails ? '' : 'none' }
  let detailsHide = { display: showDetails ? 'none' : '' }

  let divStyle = {
    margin: '10px 0px',
    border: '1px solid black',
    padding: '10px',
    borderRight: '',
  }

  return (
    <div style={divStyle}>
      <div style={detailsHide}>
        {blog.title} by {blog.author}{' '}
        <button
          onClick={() => {
            setShowDetails(true)
          }}
        >
          show
        </button>
      </div>
      <div style={detailsShow}>
        <p>
          {blog.title}{' '}
          <button
            onClick={() => {
              setShowDetails(false)
            }}
          >
            hide
          </button>{' '}
        </p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} </p>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog
