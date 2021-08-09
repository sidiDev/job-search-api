const mongoose = require('mongoose')
const crypto = require('crypto')

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: ''
    },
    jobTitle: {
        type: String,
        default: ''
    },
    number: {
        type: Number,
        default: ''
    },
    companyName: {
        type: String,
        default: ''
    },
    members: {
        type: Number,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    completed: {
        type: String,
        default: false
    },
    token: {
        type: String,
        default: crypto.randomBytes(20).toString('hex')
    }
})

const Signup = mongoose.model('users', schema)

module.exports = Signup