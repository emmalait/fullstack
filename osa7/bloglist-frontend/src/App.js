import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from './hooks'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, addLike } from './reducers/blogReducer'
import { setCurrentUser, login, logout } from './reducers/currentUserReducer'

const App = (props) => {
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const username = useField('text')
  const password = useField('text')
  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.setCurrentUser()
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
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      username.reset()
      password.reset()

      props.login(user)
    } catch (exception) {
      username.reset()
      password.reset()
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    props.logout()
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

      {props.currentUser === null ? (
        loginForm()
      ) : (
        <div>
          <p>{props.currentUser.name} logged in</p>

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
    blogs: state.blogs,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  createBlog,
  addLike,
  setNotification,
  setCurrentUser,
  login,
  logout
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
