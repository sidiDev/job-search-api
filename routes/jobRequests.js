const express = require('express')
const ObjectId = require('mongodb').ObjectId
const JobRequests = require('../models/jobRequests/JobRequests')
const Jobs = require('../models/job/Job')
const router = express.Router()

router.get('/apply/:id', (req, res) => {

    Jobs.findOne({_id: req.params.id}, (err, doc) => {
        if (doc)  res.send({companyId: doc.company, state: true})
        else res.send({state: false})
    })
})

router.post('/apply', async (req, res) => {

    const { email, about, applicantId, jobId, companyId } = req.body

    try {
        
        Jobs.findOne({_id: jobId}, async (err, job) => {
            if (job) {
        
                const newJobRequests = new JobRequests({
                    applicant: new ObjectId(applicantId),
                    job: new ObjectId(job._id),
                    companyId,
                    skills: new ObjectId(applicantId),
                    email: email,
                    about: about,
                })

                newJobRequests.save(err => {
                    if (err) console.log(err)
                    else res.send({submited: true})
                })

            }
        })


    } catch (err) {
        console.log(err)
    }
})

router.get('/requests/:id', (req, res) => {
    JobRequests.find({applicant: req.params.id}).populate({
        path: 'job',
        populate: {
            path: 'company',
            model: 'users',
            select: {'avatar': 1, 'companyName': 1}
        }
    }).exec((err, jobs) => {
        if (jobs) res.send({jobs})
    })
})

router.post('/requests/delete', (req, res) => {
    JobRequests.deleteOne({_id: req.body.id}, err => {
        if (err) console.log(err)
        else {
            JobRequests.find({applicant: req.body.userId}).populate({
                path: 'job',
                populate: {
                    path: 'company',
                    model: 'users',
                    select: {'avatar': 1, 'companyName': 1}
                }
            }).exec((err, jobs) => {
                if (jobs) res.send({jobs})
            })
        }
    })
})

module.exports = router