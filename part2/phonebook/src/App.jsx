import { useEffect, useState } from 'react'
import Person from './Person'
import PersonForm from './PersonForm'
import SearchFilter from './SearchFilter'
import personService from './services/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')

  const messageStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const hook = () => {
    personService.getAll()
    .then(allPersons => {
      setPersons(allPersons)
    })
    .catch((error) => {
      setMessage(error.message)
        setTimeout(() => {
          setMessage(null)
        }, 4000)
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
        setMessage(`${newPerson.name} has been added`)
      } catch (error) {
        setMessage(error.message)
        setTimeout(() => {
          setMessage(null)
        }, 1000)
      }
    } else {
      await checkUpdate(existingEntry);
    }
  }
  const checkUpdate = async (existingEntry) => {
    try {
      const confirm = window.confirm(`${newName} is already in the phone book. Do you want to update their number?`)
    if(!confirm) {
      return
    } else {
      existingEntry.number = newNumber
      const updatedNumber = await personService.update(existingEntry.id, existingEntry)
      setNewNumber(updatedNumber)
      setNewName('');
      setNewNumber('');
      setMessage(`${existingEntry.name}'s contact has been updated to ${newNumber}`)
    }
    } catch (error) {
      setMessage(error.message)
        setTimeout(() => {
          setMessage(null)
        }, 1000)
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
      setMessage(`${person.name} has already been deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 4000)
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
      <Notification messageStyle={messageStyle} message={message} />
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