import React, { useState, useEffect } from 'react'
import Notification from '../components/Notification'
import { useField } from "../hooks";
import commentService from '../services/comments'
import { Table, Form, Button } from 'react-bootstrap'

const Blog = (props) => {
  if (props.blog === undefined) { 
    return null
  }

  const content = useField("text");
  const [comments, setComments ] = useState([])

  useEffect(() => {
    commentService.getAll().then(comments => {
      console.log('kaikki: ', comments)
      const blogsComments = comments.filter(comment => comment.blog.id === props.blog.id)
      console.log(blogsComments)
      if (blogsComments.length > 0) {
        setComments(blogsComments)
      } 
    })
  }, [])

  let name = ''

  if (props.blog.user) {
    name = props.blog.user.name
  }

  const likeBlog = async blog => {
    props.addLike(blog.id);
    props.notify(`blog ${blog.title} by ${blog.author} liked!`);
  };

  const createComment = event => {
    event.preventDefault();

    const commentObject = {
      content: content.value,
      blog: props.blog.id
    };

    commentService.create(commentObject)

    props.notify(
      "a new comment was added!"
    );

    content.reset();
  };

  return (
        <div>

        <Notification message={props.notification} />

        <h1>{props.blog.title} {props.blog.author}</h1>
        
        <a href={props.blog.url}>{props.blog.url}</a>
            <br />
            {props.blog.likes} likes <Button variant="primary" onClick={() => likeBlog(props.blog)}>like</Button>
            <br />
            added by {name}

        <h2>comments</h2>

        <Form onSubmit={createComment}>
        <div>
          <Form.Control
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        <Button variant="primary" type="submit">add comment</Button>
        </div>
      </Form>

        <ul>
        {comments.map(comment => (
          <li>{comment.content}</li>
        ))}
        </ul>
    </div>
  )
}

export default Blog
