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

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
