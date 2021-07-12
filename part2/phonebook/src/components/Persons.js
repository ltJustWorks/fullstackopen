const Person = ({person, deletePerson}) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => {deletePerson(person.id)}}>Delete</button>
    </div>
  )
}

const Persons = ({filteredPeople, deletePerson}) => {
  return (
    <div>
      {filteredPeople.map(person => <Person person={person} deletePerson={deletePerson} key={person.name} />)}
    </div>
  )

}

export default Persons