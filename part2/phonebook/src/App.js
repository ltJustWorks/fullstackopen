import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Error from './components/Error'
import personsService from './services/persons'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ keyword, setKeyword ] = useState('')
  const [ filter, setFilter ] = useState(false)
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNotificationMessage = message => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleErrorMessage = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newId = persons.length > 1 ? persons[persons.length - 1].id + 1 : 1

    const newPerson = {
      name: newName,
      number: newPhone,
      id: newId
    }

    const personCheck = persons.find(person => person.name === newName)

    if (personCheck !== undefined) {
      const id = personCheck.id
      if (window.confirm(`${newName} is already added to phonebook, do you want to update the existing entry?`)) {
        updatePerson(id, newPerson)
      }
      setNewName('')
      setNewPhone('')
      return
    }

    personsService
      .add(newPerson)
      .then(response => {
        setPersons([...persons, response.data])
        handleNotificationMessage(`Added ${newName}`)
      })
      .catch(error => {
        handleErrorMessage('Error when adding entry')
      })

    setNewName('')
    setNewPhone('')
  }

  const updatePerson = (id, newPerson) => {
    personsService
      .update(id, newPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response.data))
        handleNotificationMessage(`Changed ${newName}'s number to ${newPhone}`)
      })
      .catch(error => {
        console.log('error: ', error)
        handleErrorMessage(`Information of ${newPerson.name} was already removed from server`)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const deletePerson = (id) => {
    const personName = persons.find(person => person.id === id).name
    if (!window.confirm(`Delete ${personName}?`)) return

    personsService
      .remove(id)
      .then(response => {
        handleNotificationMessage(`Removed ${personName} from phonebook`)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        handleErrorMessage(`Information of ${personName} was already removed from server`)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleKeyword = (event) => {
    setKeyword(event.target.value)
    if (event.target.value === '') {
      setFilter(false)
    }
    else {
      setFilter(true)
    }
  }

  const filterPersons = (kw) => persons.filter(person => person.name.toLowerCase().includes(kw.toLowerCase()))

  const filteredPeople = filter
    ? filterPersons(keyword)
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter handleKeyword={handleKeyword} keyword={keyword} />

      <h2>add a new</h2>
      <PersonForm newName={newName} handleNewName={handleNewName} newPhone={newPhone} handleNewPhone = {handleNewPhone} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons filteredPeople={filteredPeople} deletePerson={deletePerson} />
    </div>
  )
}

export default App