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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
