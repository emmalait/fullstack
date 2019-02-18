const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const likes = blogs.map(function(blog) {
    return blog.likes
  })

  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return blogs.length === 0 ? 0 : likes.reduce(reducer)
}

const favoriteBlog = blogs => {
  const mostLikes = blogs.reduce(function(prev, current) {
    return prev.likes > current.likes ? prev : current
  })
  return mostLikes
}

const mostBlogs = blogs => {
  const authors = blogs.map(function(blog) {
    return blog.author
  })

  const count = {}

  authors.forEach(function(author) {
    count[author] = (count[author] || 0) + 1
  })

  var most = 0
  var authorWithMost = ''

  authors.forEach(function(author) {
    if (count[author] > most) {
      authorWithMost = author
      most = count[author]
    }
  })

  return { author: authorWithMost, blogs: most }
}

const mostLikes = blogs => {
  const authors = blogs.map(function(blog) {
    return blog.author
  })

  const likes = {}

  blogs.forEach(function(blog) {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
  })

  var most = 0
  var authorWithMost = ''

  authors.forEach(function(author) {
    if (likes[author] > most) {
      authorWithMost = author
      most = likes[author]
    }
  })

  return { author: authorWithMost, likes: most }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
