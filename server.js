const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/db')
const signup = require('./routes/signup')
const login = require('./routes/login')
const auth = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Sign up route
app.use('/api/user', signup)

// Login route
app.use('/api/user', login)

// Login route
app.use('/api/user', auth)

app.listen(PORT, () => console.log('Server listening on port ', PORT))