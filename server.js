const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/db')
const signup = require('./routes/signup')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Sign up route
app.use('/api/user', signup)

app.listen(PORT, () => console.log('Server listening on port ', PORT))