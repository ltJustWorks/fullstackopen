import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <div>
      <button onClick={handleClick}>
        {text}
      </button>
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const average = (good - bad) / 2
  const positive = (good / (good + neutral + bad)) * 100 + " %"
  if (good+bad+neutral === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} />
    </table>
  )
}

const App = () => {
  //constants
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    <h1>give feedback</h1>
    <Button handleClick={() => setGood(good + 1)} text="good" />
    <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
    <Button handleClick={() => setBad(bad + 1)} text="bad" />
    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App