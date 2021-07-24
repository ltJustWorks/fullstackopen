const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to mongodb')
    })
    .catch(error => {
        console.log('error connecting to mongodb -', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: Number,
        min: 8,
        required: true, 
    },
    id: Number,
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})
personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
