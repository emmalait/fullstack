import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('../services/blogs')
import App from '../App'

describe('<App />', () => {
  it('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))

    // expectations here

    expect(component.container).toHaveTextContent('login')
    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')
  })
})

describe('<App />', () => {
  it('if user is logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.blog'))

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(6)

    expect(component.container).toHaveTextContent('React patterns')
    expect(component.container).toHaveTextContent('First class tests')
    expect(component.container).toHaveTextContent('TDD harms architecture')
  })
})
