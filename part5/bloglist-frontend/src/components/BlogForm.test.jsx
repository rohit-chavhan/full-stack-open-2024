import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import BlogForm from './BlogForm'

test('check add blog event handler recieves required values', async () => {
  const addBlog = vi.fn()

  render(<BlogForm addBlog={addBlog} />)

  const user = userEvent.setup()
  const title = screen.getByPlaceholderText('write title here')
  const author = screen.getByPlaceholderText('write author name here')
  const url = screen.getByPlaceholderText('write url of blog here')

  const addBtn = screen.getByText('create')
  await user.type(title, 'new era')
  await user.type(author, 'rohit dilbar')
  await user.type(url, 'kafka.com')

  await user.click(addBtn)

  expect(addBlog.mock.calls).toHaveLength(1)

  expect(addBlog.mock.calls[0][0].title).toBe('new era')
})
