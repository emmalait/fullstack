import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    const sum = props.good + props.neutral + props.bad

    if(sum === 0) {
        return (
            <div>
                <h1>Statistiikka</h1>  

                <p>Ei yhtään palautetta annettu!</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Statistiikka</h1>

            <table>
                <tbody>
                    <Statistic label="Hyvä" value={props.good}/>
                    <Statistic label="Neutraali" value={props.neutral}/>
                    <Statistic label="Huono" value={props.bad}/>
                    <Statistic label="Yhteensä" value={sum}/>
                    <Statistic label="Keskiarvo" value={((props.good * 1) + (props.bad * -1)) / sum}/>
                    <Statistic label="Positiivisia" value={(props.good / sum) * 100 + " %"} />
                </tbody>
            </table>
  
        </div>
    )
}

const Statistic = (props) => {
    return (
        <>

        <tr>
            <td>{props.label}:</td>
            <td>{props.value}</td>
        </tr>

        </>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    ) 
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>Anna palautetta</h1>

        <p>
            <Button handleClick={() => setGood(good + 1)} text='Hyvä' />&nbsp;
            <Button handleClick={() => setNeutral(neutral + 1)} text='Neutraali' />&nbsp;
            <Button handleClick={() => setBad(bad + 1)} text='Huono' />
        </p>

        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)