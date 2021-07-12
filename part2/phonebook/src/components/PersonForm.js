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

export default PersonForm