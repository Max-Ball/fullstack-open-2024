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

const Stats = (props) => {
  if(props.all === 0) {
    return(
      <div>
        <h2>No Feedback Given</h2>
      </div>
    )
  } else {
    return(
      <div>
        <StatLine text={"good"} value={props.good} />
        <StatLine text={"neutral"} value={props.neutral}/>
        <StatLine text={"bad"} value={props.bad}/>
        <StatLine text={"all"} value={props.all}/>
        <StatLine text={"average"} value={props.average}/>
        <StatLine text={"positive"} value={props.positive}/>
      </div>
    )
  }
}

const StatLine = ({text, value}) => {
  return(
    <div>
      <table>
        <tbody>
        <tr>
          <td width="75px">{text}</td>
          <td>{value}</td>
        </tr>
        </tbody>
      </table>

    </div>
  )
}

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
      <Stats good={good} neutral={neutral} bad={bad} average={average} all={all} positive={positive} />
    </div>
  )
}

export default App