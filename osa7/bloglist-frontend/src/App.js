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

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }

  console.log('userById: ', props.userById('5c73db6887f7ba03f469f0bd'))

  return (
    <Router>
        <div>
          <div>
            <Link style={padding} to="/">
              home
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
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

  const likeBlog = async blog => {
    props.addLike(blog.id);
    props.notify(`blog ${blog.title} by ${blog.author} liked!`);
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
    <h1>bloglist</h1>

    <Notification message={props.notification} />

    {props.currentUser === null ? (
      loginForm()
    ) : (
      <div>
        <p>
        {blogForm()}
        </p>

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
)}

const Users = (props) => {

  return (
    <div>
      <h1>Users</h1>

      <table>
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
      </table>
      
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

  const padding = { padding: 5 };

  return (
    <div class="container">
      <h1>blogs</h1>

      {props.currentUser === null ? (
        ''
      ) : (
        <div>
          <p>{props.currentUser.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}

      <Menu 
        notify={notify}
        currentUser={props.currentUser}
        notification={props.notification}
        blogs={props.blogs}
        createBlog={props.createBlog}
        addLike={props.addLike}
        login={props.login}
        users={users}
        setUser={setUsers}
        userById={userById}
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
