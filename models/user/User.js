const mongoose = require('mongoose')
const crypto = require('crypto')

const schema = new mongoose.Schema({
    avatar: {
        type: String,
        default: ''
    },
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
        type: String,
        default: ''
    },
    companyName: {
        type: String,
        default: ''
    },
    members: {
        type: String,
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
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: crypto.randomBytes(20).toString('hex')
    }
})

const User = mongoose.model('users', schema)

module.exports = User