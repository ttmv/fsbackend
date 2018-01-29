const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res) { 
    return JSON.stringify(req.body) 
})

app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    },
    {
        "name": "Uusi Henkilö",
        "number": "12345",
        "id": 6
    },
    {
        "name": "Asdf Argh",
        "number": "1231231",
        "id": 8
    },
    {
        "name": "aksdj",
        "number": "908098",
        "id": 10
    }
]


app.get('/', (req, res) => {
    res.send('<div></div>')
})


app.get('/info', (req, res) => {
    let infotxt = `Puhelinluettelossa on ${persons.length} henkilön tiedot.`
    
    res.send(`<div><p>${infotxt}</p><p> ${Date()} </p></div>`)
})


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(Person.format))
    }).catch(err => {console.log(err)})
})


app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person ) res.json(person)
    else res.status(404).end()
})

app.put('/api/persons/:id', (req, res) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    }
    
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updated => {
        res.json(Person.format(updated))
    }).catch(err => {
        console.log(err)
        response.status(400).send({ error: err })
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id).then(result => {
        res.status(204).end()
    }).catch(err => {
        console.log(err)
        res.status(400).send({ error: err })
    })
})


app.post('/api/persons/', (req, res) => {
    //const person = req.body
    //person.id = Math.ceil(Math.random()*200000)
    const p = req.body

    if(!p.name) {
        return res.status(400)
            .json({error: 'name missing'})        
    }

    if(!p.number) {
        return res.status(400)
            .json({error: 'number missing'})        
    }

    const person = new Person({
        name: p.name,
        number: p.number
    })

    person.save().then(saved => {
        res.json(Person.format(saved))
    }).catch(err => {
        console.log(err)
    })
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

