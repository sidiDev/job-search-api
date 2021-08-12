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
const job = require('./routes/job')

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

// Company job route
app.use('/api/company', job)

// Employee profile route
app.use('/api/employee', employeeProfile)

// Employee skills route
app.use('/api/employee', skills)

// Job.findOne({_id: new ObjectId('6113b8d757525a1b7e1d9943')}).populate('company').exec((err, doc) => {
//     console.log(doc);
// })

app.listen(PORT, () => console.log('Server listening on port ', PORT))