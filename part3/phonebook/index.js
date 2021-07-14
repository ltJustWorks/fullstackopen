const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('json-object', (request, response) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json-object'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)

	if (person) {
		response.json(person)
	}
	else {
		response.status(404).end()
	}
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body) {
	  return response.status(404).json({
		  error: 'No person has been inputted'
	  })
  }
  else if (!body.name || !body.number) {
	  return response.status(404).json({
		  error: 'The name or number is missing'
	  })
  }
  else if (persons.some(person => person.name === body.name)) {
	  return response.status(404).json({
		  error: 'The name already exists in the phonebook'
	  })
  }

  const newPerson = {
	  id: Math.floor(Math.random() * 1000),
	  name: body.name,
	  number: body.number
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

app.get('/info', (request, response) => {
  response.send(`
	<p>Phonebook has info for ${persons.length} people</p>
	<p>${new Date()}</p>
	`)
}) 


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`)
})
