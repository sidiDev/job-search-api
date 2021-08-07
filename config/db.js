const mongoose = require('mongoose')

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const uri = process.env.URI || 'mongodb://localhost:27017/jobSearch'

mongoose.connect(uri, option, err => {
    if (err) console.log(err)
    console.log('Database connected successfully')
})