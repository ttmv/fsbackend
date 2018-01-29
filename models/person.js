const mongoose = require('mongoose')

const url = 'mongodb://numerot:numerot@ds119028.mlab.com:19028/fsnumerot'

mongoose.connect(url)
mongoose.Promise = global.Promise

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.statics.format = function(person) {
    return {
        name: person.name, 
        number: person.number, 
        id: person._id
    } 
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
