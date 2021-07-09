import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ keyword, setKeyword ] = useState('')
  const [ filter, setFilter ] = useState(false)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newId = persons[persons.length - 1].id + 1

    const newPerson = {
      name: newName,
      number: newPhone,
      id: newId
    }
    console.log(newPerson)

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
      })

    setNewName('')
    setNewPhone('')
  }

  const updatePerson = (id, newPerson) => {
    personsService
      .update(id, newPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response.data))
      })
  }

  const deletePerson = (id) => {
    const personName = persons.find(person => person.id === id).name
    if (!window.confirm(`Delete ${personName}?`)) return

    personsService
      .remove(id)
      .then(response => {
        console.log(response)
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
      <Filter handleKeyword={handleKeyword} keyword={keyword} />

      <h1>add a new</h1>
      <PersonForm newName={newName} handleNewName={handleNewName} newPhone={newPhone} handleNewPhone = {handleNewPhone} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons filteredPeople={filteredPeople} deletePerson={deletePerson} />
    </div>
  )
}

export default App