import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, setUpdatedBlog }) => {
  const [visible, setVisible] = useState(false)

  //const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let name = ''

  if (blog.user) {
    name = blog.user.name
  }

  setUpdatedBlog(blog)

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility} className='blog'>
        {blog.title} {blog.author}
        <div style={showWhenVisible}>
          <p>
            <a href={blog.url}>{blog.url}</a>
            <br />
            {blog.likes} likes <button onClick={updateBlog}>like</button>
            <br />
            added by {name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Blog
