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
    skills: {
        ref: 'skills',
        type: mongoose.Schema.Types.ObjectId
    },
    companyId: String,
    resume: String,
    email: String,
    about: String,
})

const JobRequests = mongoose.model('jobRequests', shema)

module.exports = JobRequests