import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const username = useField('text')
  const password = useField('text')
  const [user, setUser] = useState(null)
  const [updatedBlog, setUpdatedBlog] = useState(null)

  const blogFormRef = React.createRef()

  const store = props.store

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService.setToken(user.token)
    }
  }, [])

  const addBlog = event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      likes: 0
    }

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      notify('a new blog ' + newTitle.value + ' by ' + newAuthor.value + ' added!')

      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
    })
  }

  const notify = (message, notifType = 'success') => {
    store.dispatch(
      setNotification(
        message,
        notifType,
        10
      )
    )
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(likedBlog)
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const un = username.value
      const pw = password.value

      const user = await loginService.login({
        username: un,
        password: pw
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken('')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        onSubmit={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>bloglist</h1>

      <Notification message={store.getState()} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>

          <button onClick={handleLogout}>logout</button>

          {blogForm()}

          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              setUpdatedBlog={setUpdatedBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
