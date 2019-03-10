import React from 'react'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({
  onSubmit,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return (
    <div>
      <h2>create new blog</h2>

      <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
          
          <Form.Control
            id='title'
            type={newTitle.type}
            value={newTitle.value}
            onChange={newTitle.onChange}
          />

        <Form.Label>Author</Form.Label>
          <Form.Control
            id='author'
            type={newAuthor.type}
            value={newAuthor.value}
            onChange={newAuthor.onChange}
          />

        <Form.Label>Url</Form.Label>
          <Form.Control
            id='url'
            type={newUrl.type}
            value={newUrl.value}
            onChange={newUrl.onChange}
          />
        <Button variant="primary" type="submit">save</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
