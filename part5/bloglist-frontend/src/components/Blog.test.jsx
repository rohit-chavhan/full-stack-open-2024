import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('blog title and author', () => {
  const blogObj = {
    id: 'id',
    blog: {
      title: 'red kafka',
      author: 'kamla',
      name: 'debry',
      user: { name: 'gatsby' },
      url: 'www.heyma.com',
      likes: 12,
    },
    updateLikes: () => 'update',
    deleteBlog: () => 'deleteBlog',
  }

  render(
    <Blog
      key={'key'}
      id={blogObj.id}
      blog={blogObj.blog}
      updateLikes={blogObj.updateBlog}
      deleteBlog={blogObj.deleteBlogIt}
    />
  )

  const summary = screen.getByText('red kafka by kamla')
  expect(summary).toBeDefined()

  const url = screen.queryByText('www.heyma.com')
  const likes = screen.queryByText(12)

  expect(url).not.toBeInTheDocument
  expect(likes).not.toBeInTheDocument
})
