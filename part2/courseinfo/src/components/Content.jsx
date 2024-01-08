import Part from "./Part"
import Total from "./Total"
const Content = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  const initTotal = 0;
  const summedTotal = exercises.reduce(
    (accum, current) => accum + current, initTotal
  )
    return(
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
        <Total total={summedTotal}/> 
      </div>
    )
  }

  export default Content