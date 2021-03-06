import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async content => {
  const object = { content, votes: 0 }
  const response = await axios.post(url, object)
  return response.data
}

const update = (id, newObject) => {
  return axios.put(`${url}/${id}`, newObject)
}

export default { 
  getAll,
  createNew,
  update
}