import React from 'react'

const BlogForm = ({
  onSubmit,
  handleTitleChange,
  newTitle,
  handleAuthorChange,
  newAuthor,
  handleUrlChange,
  newUrl
}) => {
  return (
    <div>
      <h2>create new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
          Title
          <input value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          Author
          <input value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          Url
          <input value={newUrl} onChange={handleUrlChange} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
