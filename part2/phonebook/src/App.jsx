import { useState } from 'react'
import Person from './Person'
import PersonForm from './PersonForm'
import SearchFilter from './SearchFilter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const submitNewPerson = (event) => {
    event.preventDefault();

    const personObj = {
      name: newName,
      number: newNumber
    }

    const existingEntry = persons.find(p => p.name === newName)

    if(!existingEntry) {
      setPersons(persons.concat(personObj))
      setNewName('');
    } else {
      alert(`${newName} is already in the phone book`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter persons={persons} />
      <h2>Add a contact</h2>
      <PersonForm 
        submitNewPerson={submitNewPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Contacts</h2>
      {persons.map(person => 
          <Person person={person} key={person.name} />
        )}
    </div>
  )
}

export default App