const mongoose = require('mongoose')
const crypto = require('crypto')

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
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

const SignUp = mongoose.model('users', schema)

module.exports = SignUp