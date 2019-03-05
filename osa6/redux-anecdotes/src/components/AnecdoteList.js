import React from "react";
import { createVote } from '../reducers/anecdoteReducer'
import { createNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const anecdotes = props.store.getState().anecdotes
  const filter = props.store.getState().filters

  const anecdotesToShow = filter.length === 0
    ? anecdotes 
    : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()) )

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
      {anecdotesToShow.map(anecdote => (
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
