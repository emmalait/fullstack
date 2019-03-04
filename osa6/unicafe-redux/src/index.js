import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>

      <h2>Anna palautetta</h2>
      <p>
        <button onClick={good}>hyvä</button> 
        <button onClick={ok}>neutraali</button> 
        <button onClick={bad}>huono</button>
        <button onClick={zero}>nollaa tilastot</button>
      </p>
      
      <h2>Statistiikka</h2>
      <p>
        <div>hyvä {store.getState().good}</div>
        <div>neutraali {store.getState().ok}</div>
        <div>huono {store.getState().bad}</div>
      </p>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
