const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.i6uaq0q.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0` 

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
  name: newName,
  number: newNumber,
})

if (newName === undefined && newNumber === undefined) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    person.save().then(result => {
        console.log(`added ${newName} number ${newNumber} to phonebook`)
        mongoose.connection.close()
    })
}

//command: node mongo.js password name number