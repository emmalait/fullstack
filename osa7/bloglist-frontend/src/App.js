import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useField } from "./hooks";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import User from "./components/User"
import loginService from "./services/login";
import userService from './services/users'
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, addLike } from "./reducers/blogReducer";
import { setCurrentUser, login, logout } from "./reducers/currentUserReducer";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { Table, Button } from 'react-bootstrap'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }

  const grey = {
    backgroundColor: '#C0C0C0',
    padding: 10
  }

  return (
    <Router>
        <div>
          <div style={grey}>
            <Link style={padding} to="/">
              home
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
          
            {props.currentUser === null ? (
              ''
            ) : (
              <>
                {props.currentUser.name} logged in
                <button onClick={props.handleLogout}>logout</button>
              </>
            )}

          </div>
          <Route exact path="/" render={() => 
            <Home
              notify={props.notify}
              currentUser={props.currentUser}
              notification={props.notification}
              blogs={props.blogs}
              createBlog={props.createBlog}
              addLike={props.addLike}
              login={props.login}
            />
          } />
          <Route exact path="/users" render={() =>
            <Users 
              users={props.users}
              setUser={props.setUsers}
              userById={props.userById}
            />
          } />
          <Route exact path="/users/:id" render={({match}) =>
            <User user={props.userById(match.params.id)} />
          } />
          <Route exact path="/blogs/:id" render={({match}) =>
            <Blog blog={props.blogById(match.params.id)} addLike={props.addLike} notify={props.notify} notification={props.notification}/>
          } />
        </div>
      </Router>
  )
}

const Home = (props) => {
  const newTitle = useField("text");
  const newAuthor = useField("text");
  const newUrl = useField("text");
  const username = useField("text");
  const password = useField("text");
  const blogFormRef = React.createRef();

  const addBlog = event => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();

    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      likes: 0
    };

    props.createBlog(blogObject);

    props.notify(
      "a new blog " + newTitle.value + " by " + newAuthor.value + " added!"
    );

    newTitle.reset();
    newAuthor.reset();
    newUrl.reset();
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      username.reset();
      password.reset();

      props.login(user);
    } catch (exception) {
      username.reset();
      password.reset();
      props.notify("wrong username of password", "error");
    }
  };

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
    );
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        onSubmit={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
      />
    </Togglable>
  );

  return (
  <div>
    <h1>blog app</h1>

    <Notification message={props.notification} />

    {props.currentUser === null ? (
      loginForm()
    ) : (
      <div>
        <p>
        {blogForm()}
        </p>

        <Table striped>
        <tbody>
          
        {props.blogs.map(blog => (
          <tr>
            <td>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
            </tr>
        ))}
        </tbody>
        </Table>
      </div>
    )}
  </div>
)}

const Users = (props) => {

  return (
    <div>
      <h1>Users</h1>

      <Table striped>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {props.users.map(user => (
          <tr>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </Table>
      
    </div>
  )
}

const App = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  useEffect(() => {
    props.initializeBlogs();
  }, []);

  useEffect(() => {
    props.setCurrentUser();
  }, []);

  const notify = (message, notifType = "success") => {
    props.setNotification(message, notifType, 10);
  };

  const handleLogout = async event => {
    event.preventDefault();
    props.logout();
  };

  const userById = (id) => {
    return users.find(user => user.id === id)
  }

  const blogById = (id) => {
    return props.blogs.find(blog => blog.id === id)
  }

  console.log('blogById: ', blogById('5c745f0cde9fe11f2e87046b'))

  const padding = { padding: 5 };

  return (
    <div class="container">
      <Menu 
        notify={notify}
        currentUser={props.currentUser}
        handleLogout={handleLogout}
        notification={props.notification}
        blogs={props.blogs}
        createBlog={props.createBlog}
        addLike={props.addLike}
        login={props.login}
        users={users}
        setUser={setUsers}
        userById={userById}
        blogById={blogById}
      />

      
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = {
  initializeBlogs,
  createBlog,
  addLike,
  setNotification,
  setCurrentUser,
  login,
  logout
};

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
