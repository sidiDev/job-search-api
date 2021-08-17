const express = require('express')
const ObjectId = require('mongodb').ObjectId
const Job = require('../models/job/Job')
const router = express.Router()

// Get jobs
router.post('/', (req, res) => {
    

    Job.countDocuments((err, count) => {}).then(docs => {
        Job.find({}).sort({date: -1}).limit(req.body.count).populate('company').exec((err, jobs) => {
            res.send({jobs, docs})
        })
    })
    
})

// Get job
router.get('/job/:id', (req, res) => {
    
    const { id } = req.params

    Job.findOne({_id: id}, (err, job) => {
        if (job) res.send({ job })
        else res.send({job: null})
    }).populate('company')

})

// Search and filter
router.post('/search', (req, res) => {
    const { query, count } = req.body

    const search = query.search ? {
        jobTitle: { $regex: query.search, $options: 'i' }
    } : ''

    const location = query.location ? {
        location: query.location
    } : ''

    const jobType = query.jobType ? {
        jobType: query.jobType
    } : ''

    const expLevel = query.expLevel ? {
        expLevel: query.expLevel
    } : ''

    const salary = query.salary ? {
        salary: {$lte: query.salary}
    } : ''

    Job.find({
        ...search,
        ...location,
        ...jobType,
        ...expLevel,
        ...salary
    }).sort({date: -1}).populate('company').exec((err, jobs) => {
        if (jobs.length > 0) {

            const jobsLimitted = jobs.slice(0, count)

            res.send({ jobs: jobsLimitted, docs: jobs.length, state: true })

        } else res.send({jobs: [], state: false})
    })

})

module.exports = router