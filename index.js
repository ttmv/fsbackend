const express = require('express')
const app = express()

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
    console.log("get persons")
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person ) res.json(person)
    else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    console.log("delete")
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
  
    res.status(204).end()
})

  
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
