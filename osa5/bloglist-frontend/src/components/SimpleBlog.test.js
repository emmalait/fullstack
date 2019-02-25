import React from 'react'
import { render, fireEvent } from 'react-testing-library'
//import { prettyDOM } from 'dom-testing-libarary'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const simpleBlog = {
    title: 'Otsikko on hyvä',
    author: 'Maija Meikäläinen',
    likes: 5
  }

  const component = render(<SimpleBlog simpleBlog={simpleBlog} />)

  expect(component.container).toHaveTextContent('Otsikko on hyvä')
  expect(component.container).toHaveTextContent('Maija Meikäläinen')
  expect(component.container).toHaveTextContent('blog has 5 likes')
})

it('clicking the button calls event handler once', async () => {
  const simpleBlog = {
    title: 'Otsikko on hyvä',
    author: 'Maija Meikäläinen',
    likes: 5
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog simpleBlog={simpleBlog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
