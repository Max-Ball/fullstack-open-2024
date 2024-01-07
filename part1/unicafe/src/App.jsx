import { useState } from 'react'

const Header = ({text}) => (
  <div>
    <h1>
      {text}
    </h1>
  </div>
)

const Button = ({text, handleClick}) => {
  return(
    <span>
      <button onClick={handleClick}>{text}</button>
    </span>
  )
}

const Stats = ({text, number}) => (
  <div>
    <span>{text} {number}</span>
  </div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    // Set number of good clicks
    setGood(good + 1)

    // Add to total number of clicks
    const updatedGood = good + 1;
    setAll(updatedGood + neutral + bad)

    // Average score (Good: +1; Neutral: 0; Bad: -1)
    const goodValue = updatedGood
    const badValue = -(bad)
    const neutralValue = 0;
    setAverage((goodValue + badValue + neutralValue) / 3)


    // Percentage of positive votes
    const updatedAll = all + 1;
    setPositive(updatedGood / updatedAll)
  }

  const handleNeutral = () => {
    // Set number of neutral clicks
    setNeutral(neutral + 1)

    // Add to total number of clicks
    const updatedNeutral = neutral + 1;
    setAll(good + updatedNeutral + bad)


    // Percentage of positive votes
    const updatedAll = all + 1;
    setPositive(good / updatedAll)
  }

  const handleBad = () => {
    // Set number of bad clicks
    setBad(bad + 1)

    // Add to total number of clicks
    const updatedBad = bad + 1;
    setAll(good + neutral + updatedBad)

    // Average score (Good: +1; Neutral: 0; Bad: -1)
    const badValue = -(updatedBad)
    const goodValue = good
    const neutralValue = 0;
    setAverage((goodValue + badValue + neutralValue) / 3)

    // Percentage of positive votes
    const updatedAll = all + 1;
    setPositive(good / updatedAll)
  }

  

  return (
    <div>
      <Header text={"Give Feedback"} />
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <Header text={"Statistics"} />
      <Stats text={"good"} number={good} />
      <Stats text={"neutral"} number={neutral} />
      <Stats text={"bad"} number={bad} />
      <Stats text={"all"} number={all} />
      <Stats text={"average"} number={average} />
      <Stats text={"positive"} number={positive} />
    </div>
  )
}

export default App