const express = require('express')
const ObjectId = require('mongodb').ObjectId
const Job = require('../models/job/Job')
const router = express.Router()

// Post new job
router.post('/new', (req, res) => {

    const { jobTitle, location, salary, jobType, expLevel, jobDetails, id } = req.body
    
    const newJob = new Job({
        userId: id,
        jobTitle,
        location,
        salary,
        jobType,
        expLevel,
        jobDetails,
        company: new ObjectId(id)
    })

    newJob.save(err => {
        if (err) console.log(err)
        else res.send({published: true})
    })
})

// Get jobs
router.get('/jobs/:id', (req, res) => {
    const { id } = req.params

    console.log(id);

    Job.find({userId: id}, (err, jobs) => {
        if (jobs) res.send({ jobs })
        else res.send({ jobs: [] })
    }).populate('company')
})

// Delete job
router.delete('/jobs/:id', (req, res) => {

    const { id } = req.params

    Job.deleteOne({_id: id}, err => {
        if (err) console.log(err)
        else res.send({deleted: true})
    })
})

// Get job
router.get('/job/:id', (req, res) => {
    const { id } = req.params

    Job.findOne({_id: id}, (err, job) => {
        if (job) res.send({ job })
        else res.send({ job: '' })
    })
})

// update job
router.patch('/job/:id', (req, res) => {
    const {
        id,
        jobTitle,
        location,
        salary,
        jobType,
        expLevel,
        jobDetails,
     } = req.body

     Job.updateOne({_id: id}, {
        jobTitle,
        location,
        salary,
        jobType,
        expLevel,
        jobDetails
     }, err => {
         if (err) console.log(err)
         else res.send({updated: true}) 
     })
})

module.exports = router