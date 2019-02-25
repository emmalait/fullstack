import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Otsikko on hyvä',
    author: 'Maija Meikäläinen',
    url: 'http://testiurl.com',
    likes: 5
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('Otsikko on hyvä')
  expect(component.container).toHaveTextContent('Maija Meikäläinen')
})

it('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Otsikko on hyvä',
    author: 'Maija Meikäläinen',
    url: 'http://testiurl.com',
    likes: 5
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} onClick={mockHandler} />
  )

  const div = getByText('Otsikko on hyvä Maija Meikäläinen')
  fireEvent.click(div)

  expect(div).toHaveTextContent('http://testiurl.com')
})
