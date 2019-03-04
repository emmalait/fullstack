import React from "react";
import { createVote } from '../reducers/anecdoteReducer'
import { createNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const anecdotes = props.store.getState().anecdotes;

  const vote = id => {
    console.log("vote", id);
    props.store.dispatch(createVote(id))
    props.store.dispatch(createNotification("You voted " + anecdotes.find(anecdote => {
      return anecdote.id === id
    }).content))
    setTimeout(() => {
      props.store.dispatch(
        resetNotification()
      )
    }, 5000)
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
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

export default AnecdoteList;
