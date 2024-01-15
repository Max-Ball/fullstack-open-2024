const Person = ({person, deletePerson}) => {
    return (
        <div>
            <span>{person.name}: {person.number}</span>
            <button onClick={deletePerson}>Delete</button>
        </div>
    )
}

export default Person;