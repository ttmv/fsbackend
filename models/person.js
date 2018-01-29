const mongoose = require('mongoose')

const url = 'mongodb://numerot:numerot@ds119028.mlab.com:19028/fsnumerot'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person
