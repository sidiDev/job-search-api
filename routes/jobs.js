const express = require('express')
const ObjectId = require('mongodb').ObjectId
const Job = require('../models/job/Job')
const router = express.Router()

router.post('/', (req, res) => {
    

    const docs = Job.countDocuments((err, count) => {}).then(docs => {
        Job.find({}, (err, jobs) => {
            res.send({jobs, docs})
        }).limit(req.body.count).populate('company')
    })
    

})

router.get('/job/:id', (req, res) => {
    
    const { id } = req.params

    Job.findOne({_id: id}, (err, job) => {
        if (job) res.send({ job })
        else res.send({job: null})
    }).populate('company')

})

module.exports = router