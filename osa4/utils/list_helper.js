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

module.exports = {
  dummy,
  totalLikes
}
