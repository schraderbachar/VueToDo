const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost/mevn-db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB connected'))
    .catch(err => console.error(err))
//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'))
app.use(express.json())

//routes
app.use('/api/tasks', require('./routes/tasks'))

//static files
app.use(express.static(__dirname + '/public'))
//Server listening
app.listen(app.get('port'), () => {
    console.log(`Server up and running on port`, app.get('port'))

})