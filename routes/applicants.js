const express = require('express')
const JobRequests = require('../models/jobRequests/JobRequests')
const router = express.Router()

router.get('/applicants/:id', (req, res) => {
    JobRequests.find({
        companyId: req.params.id
    }).populate({
        path: 'applicant',
        model: 'users',
        select: {
            'avatar': 1,
            'username': 1,
            'jobTitle': 1,
            'number': 1,
        }
    }).populate('skills').exec((err, applicants) => {
        if (applicants) res.send({ applicants })
    })
})

router.post('/applicants/delete', (req, res) => {
    const { _id, companyId } = req.body

    JobRequests.deleteOne({ _id }, err => {
        if (err) console.log(err)
        else {
            JobRequests.find({
                companyId
            }).populate({
                path: 'applicant',
                model: 'users',
                select: {
                    'avatar': 1,
                    'username': 1,
                    'jobTitle': 1,
                    'number': 1,
                }
            }).populate('skills').exec((err, applicants) => {
                if (applicants) res.send({ applicants })
            })
        }
    })
})

module.exports = router