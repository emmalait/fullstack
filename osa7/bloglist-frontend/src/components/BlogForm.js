import React from 'react'

const BlogForm = ({
  onSubmit,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return (
    <div>
      <h2>create new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
          Title
          <input
            type={newTitle.type}
            value={newTitle.value}
            onChange={newTitle.onChange}
          />
        </div>
        <div>
          Author
          <input
            type={newAuthor.type}
            value={newAuthor.value}
            onChange={newAuthor.onChange}
          />
        </div>
        <div>
          Url
          <input
            type={newUrl.type}
            value={newUrl.value}
            onChange={newUrl.onChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
