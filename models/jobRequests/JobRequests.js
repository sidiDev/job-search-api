const mongoose = require('mongoose')

const shema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs'
    },
    resume: String,
    email: String,
    about: String,
})

const JobRequests = mongoose.model('jobRequests', shema)

module.exports = JobRequests