import React from 'react'
import Notification from '../components/Notification'

const Blog = (props) => {
  if (props.blog === undefined) { 
    return null
  }

  let name = ''

  if (props.blog.user) {
    name = props.blog.user.name
  }

  const likeBlog = async blog => {
    props.addLike(blog.id);
    props.notify(`blog ${blog.title} by ${blog.author} liked!`);
  };

  return (
        <div>

        <Notification message={props.notification} />

        <h1>{props.blog.title} {props.blog.author}</h1>
        
        <a href={props.blog.url}>{props.blog.url}</a>
            <br />
            {props.blog.likes} likes <button onClick={() => likeBlog(props.blog)}>like</button>
            <br />
            added by {name}
          
    </div>
  )
}

export default Blog
