import React from "react"
import { connect } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { createNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = id => {
    console.log("vote", id);
    props.createVote(id)
    props.createNotification("You voted " + props.visibleAnecdotes.find(anecdote => {
      return anecdote.id === id
    }).content)
    setTimeout(() => {
      props.resetNotification()
    }, 5000)
  };

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const anecdotesToShow = (anecdotes, filter) => {
  return filter.length === 0
    ? anecdotes 
    : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  createVote,
  createNotification,
  resetNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList;
