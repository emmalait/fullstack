import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.createNotification("You created " + content)
        setTimeout(() => {
          props.resetNotification()
        }, 5000)
      }
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div>
            <input name="anecdote"/>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
}

const mapDispatchToProps = {
  createAnecdote,
  createNotification,
  resetNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
export default ConnectedAnecdoteForm