import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action ', action)

  switch (action.type) {
  case 'LIKE':
    const id = action.data
    const blogToChange = state.find(blog => blog.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    blogService.update(id, changedBlog)
    return state
      .map(blog => (blog.id !== id ? blog : changedBlog))
      .sort((a, b) => b.likes - a.likes)
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data.sort((a, b) => b.likes - a.likes)
  default:
    return state
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const addLike = (id) => {
  return async dispatch => {
    dispatch({
      type: 'LIKE',
      data: id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer
