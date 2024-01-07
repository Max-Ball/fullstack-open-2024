import { useState } from 'react'

const Button = ({onClick, text}) => (
  <div>
    <button onClick={onClick}>{text}</button>
  </div>
)

const Header = ({title}) => (
  <div>
    <h1>{title}</h1>
  </div>
)

const Anecdote = ({anecdote}) => (
  <div>
    {anecdote}
  </div>
)

const Point = ({point}) => (
  <div>
    has {point} points
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const pointArray = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(pointArray);
  const mostPoints = Math.max(...points);
  const topAnecdote = anecdotes[points.indexOf(mostPoints)]

  const handleClick = (max) => {
    const amount = Math.floor(Math.random() * anecdotes.length);
    setSelected(amount); 
  }

  const handlePoints = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1;
    setPoints(pointsCopy)
  }

  return (
    <div>
      <Button text="vote" onClick={handlePoints} />
      <Button text="next anecdote" onClick={handleClick} />
      <Header title="Anecdote of the Day"/>
      <Anecdote anecdote={anecdotes[selected]} />
      <Point point={points[selected]} />
      <Header title="Anecdote with the most votes"/>
      <Anecdote anecdote={topAnecdote} />
    </div>
  )
}

export default App