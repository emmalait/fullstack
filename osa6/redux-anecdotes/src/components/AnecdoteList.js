import React from "react";
import { createVote } from "../reducers/anecdoteReducer";

const AnecdoteList = props => {
  const anecdotes = props.store.getState();

  const vote = id => {
    console.log("vote", id);
    props.store.dispatch(createVote(id));
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
