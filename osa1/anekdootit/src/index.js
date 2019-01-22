import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {

    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
    
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, {length: props.anecdotes.length}).map(function() {return 0;}))
  const random = Math.floor(Math.random() * (props.anecdotes.length - 1))

  const updatePoints = () => {
        const copy = points
        copy[selected] = copy[selected] + 1
        return copy
  }

  const popular = () => {
      if (points.length === 0) {
          return -1
      }

      let mostPopular = points[0]
      let popularIndex = 0

      for (let i = 1; i < points.length; i++) {
          if (points[i] > mostPopular) {
              popularIndex = i
              mostPopular = points[i]
          }
      }

      return popularIndex
  }
  
  return (
    <div>
        <h1>Anecdote of the day</h1>
        
        {props.anecdotes[selected]}

        <p>
            <Button handleClick={() => setPoints(updatePoints())} text="Vote" />&nbsp;
            <Button handleClick={() => setSelected(random)} text="Next anecdote" />
        </p>

        <h1>Anecdote with most votes</h1>

        {props.anecdotes[popular()]}

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)