import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from './hooks'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, addLike } from './reducers/blogReducer'

const App = (props) => {
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const username = useField('text')
  const password = useField('text')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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

    props.createBlog(blogObject)

    notify('a new blog ' + newTitle.value + ' by ' + newAuthor.value + ' added!')

    newTitle.reset()
    newAuthor.reset()
    newUrl.reset()
  }

  const notify = (message, notifType = 'success') => {
    props.setNotification(
      message,
      notifType,
      10
    )
  }

  const likeBlog = async (blog) => {
    props.addLike(blog.id)
    notify(`blog ${blog.title} by ${blog.author} liked!`)
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
      notify({ message: 'wrong username or password', type: 'error' })
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

      <Notification message={props.notification} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>

          <button onClick={handleLogout}>logout</button>

          {blogForm()}

          {props.blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  createBlog,
  addLike,
  setNotification
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
