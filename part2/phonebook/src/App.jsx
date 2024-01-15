import { useEffect, useState } from 'react'
import Person from './Person'
import PersonForm from './PersonForm'
import SearchFilter from './SearchFilter'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = () => {
    personService.getAll()
    .then(allPersons => {
      setPersons(allPersons)
    })
  }

  useEffect(hook, [])

  const submitNewPerson = async (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber
    }

    const existingEntry = persons.find(p => p.name === newName)

    if(!existingEntry) {
      try {
        const newPerson = await personService.create(personObj)
        setPersons(persons.concat(newPerson))
        setNewName('');
        setNewNumber('');
      } catch (error) {
        console.log(error, 'error creating entry');
      }
    } else {
      alert(`${newName} is already in the phone book`)
    }
  }
  
  const deletePerson = async (person) => {
    try {
      if(!window.confirm(`Are you sure you want to delete ${person.name}?`))
      {
        return
      } else {
        await personService.deletePerson(person.id)
        setPersons(persons.filter(p => p.id !== person.id))
      }
    } catch (error) {
      console.log(error, 'error deleting person');
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
          <Person person={person} key={person.name} deletePerson={() => deletePerson(person)} />
        )}
    </div>
  )
}

export default App