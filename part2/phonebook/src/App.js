import React, { useState } from 'react'

const Filter = ({keyword, handleKeyword}) => {
  return (
    <div>
      filter shown with <input value={keyword} onChange={handleKeyword}/>
    </div>
  )
}

const Person = ({person}) => {
  return (
    <div>
      <p key={person.name}>{person.name} {person.phone}</p>
    </div>
  )
}

const Persons = ({filteredPeople}) => {
  return (
    <div>
      {filteredPeople.map(person => <Person person={person} />)}
    </div>
  )

}

const PersonForm = ({newName, handleNewName, newPhone, handleNewPhone, addPerson}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handleNewPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
 
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ keyword, setKeyword ] = useState('')
  const [ filter, setFilter ] = useState(false)

  const addPerson = (event) => {
    event.preventDefault()

    const personNotUnq = persons.some(person => person.name === newName)

    if (personNotUnq) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewPhone('')
      return
    }

    const newPerson = {
      name: newName,
      phone: newPhone
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhone('')
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
      <Persons filteredPeople={filteredPeople} />
    </div>
  )
}

export default App