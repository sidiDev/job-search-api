const mongoose = require('mongoose')

const schema = new mongoose.Schema(({
    userId: String,
    jobTitle: String,
    location: String,
    salary: String,
    jobType: String,
    expLevel: String,
    jobDetails: String,
    date: {
        type: Number,
        default: Date.now()
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}))

const Job = mongoose.model('jobs', schema)

module.exports = Job