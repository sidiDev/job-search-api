const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/db')
const signup = require('./routes/signup')
const login = require('./routes/login')
const auth = require('./routes/auth')
const companyProfile = require('./routes/companyProfile')
const employeeProfile = require('./routes/employeeProfile')
const skills = require('./routes/skills')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Sign up route
app.use('/api/user', signup)

// Login route
app.use('/api/user', login)

// Authentication route
app.use('/api/user', auth)

// Company profile route
app.use('/api/company', companyProfile)

// Employee profile route
app.use('/api/employee', employeeProfile)

// Employee skills route
app.use('/api/employee', skills)

app.listen(PORT, () => console.log('Server listening on port ', PORT))