import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'
import { type } from '@testing-library/user-event/dist/cjs/utility/type.js'

const blogObj = {
  id: 'id',
  blog: {
    title: 'red kafka',
    author: 'kamla',
    name: 'debry',
    user: { name: 'gatsby' },
    url: 'www.heyma.com',
    likes: '12',
  },
  updateLikes: () => 'update',
  deleteBlog: () => 'deleteBlog',
}

test.skip('blog title and author', () => {
  render(
    <Blog
      key={'key'}
      id={blogObj.id}
      blog={blogObj.blog}
      updateLikes={blogObj.updateLikes}
      deleteBlog={blogObj.deleteBlog}
    />
  )

  const summary = screen.getByText('red kafka by kamla')
  expect(summary).toBeDefined()

  const url = screen.queryByText('www.heyma.com')
  const likes = screen.queryByText(12)

  expect(url).not.toBeInTheDocument()
  expect(likes).not.toBeInTheDocument()
})

test.skip('test that when show is clicked we see url and likes ', async () => {
  render(
    <Blog
      key={'key'}
      id={blogObj.id}
      blog={blogObj.blog}
      updateLikes={blogObj.updateBlog}
      deleteBlog={blogObj.deleteBlogIt}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const url = screen.getByText('www.heyma.com')
  const likes = screen.getByText('likes 12')

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test.only('check if we click button 2 times we have two times', async () => {
  const mockHandler = vi.fn()

  render(
    <Blog
      key={'key'}
      id={blogObj.id}
      blog={blogObj.blog}
      updateLikes={mockHandler}
      deleteBlog={blogObj.deleteBlog}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const likes = screen.getByText('like')

  await user.click(likes)
  await user.click(likes)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
