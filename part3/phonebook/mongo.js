const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('please provide a mongodb password')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.b8307.mongodb.net/person-app?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
console.log('connected to mongodb')

//

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)
const generateId = () => Math.floor(Math.random()*1000)

const addPerson = (newName, newNumber) => {
    const person = new Person({
        name: newName,
        number: newNumber,
        id: generateId(),
    })
    person.save().then(result => {
        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}

const showPersons = () => {
    Person
        .find({})
        .then(result => {
            console.log('phonebook:')
            result.forEach(person => {
                console.log(person.name, person.number)
            })
        mongoose.connection.close()
    })
}

//

if (process.argv.length === 3) {
    showPersons()
}

else if (process.argv.length === 5) {
    addPerson(process.argv[3], process.argv[4])
}

else {
    console.log('invalid command')
    process.exit(1)
}