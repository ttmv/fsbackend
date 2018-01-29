const mongoose = require('mongoose')

const url = 'mongodb://numerot:numerot@ds119028.mlab.com:19028/fsnumerot'

mongoose.connect(url)
mongoose.Promise = global.Promise


const Person = mongoose.model('Person', {
    name: String,
    number: String
})

if(process.argv.length > 3) {
    const person = new Person({
        name: process.argv[2], 
        number: process.argv[3]
    })

    console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)

    person.save().then(result => {
        mongoose.connection.close()
    })

} else if(process.argv.length < 3) {
    Person.find({}).then(result => {
        console.log("Puhelinluettelo:")
        result.forEach(person => {
            console.log(person.name, person.number)
        })

        mongoose.connection.close()
    })
} else {
    console.log("Lisää uusi: node mongo.js [nimi] [numero]")
    console.log("hae kaikki: node mongo.js")
    mongoose.connection.close()
}

