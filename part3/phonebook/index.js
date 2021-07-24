const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('json-object', (request) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json-object'))

if (app) {
    console.log('app exists')
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        }
        else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(404).json({
            error: 'name or number is missing'
        })
    }

    const newPerson = new Person({
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number,
    })

    newPerson.save()
        .then(result => {
            console.log(newPerson.name, newPerson.number, 'saved to phonebook')
            response.json(result)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    Person.findByIdAndUpdate(request.params.id, { name: body.name, number: body.number }, { new: true, runValidators: true, context: 'query' })
        .then(result => {
            console.log(request.body.name, 'was updated')
            response.json(result)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

app.get('/info', (request, response) => {
    Person.countDocuments().then(result => {
        response.send(`
			<p>Phonebook has info for ${result} people</p>
			<p>${new Date()}</p>
		`)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
