const express = require('express')
const ObjectId = require('mongodb').ObjectId
const Skills = require('../models/skills/Skills')
const router = express.Router()

router.post('/skills/new', (req, res) => {

    const { userId, skills } = req.body

    const id = new ObjectId(userId)

    Skills.findOne({_id: id}, (err, doc) => {
        if (doc) {

            Skills.updateOne({_id: id}, {
                $push: {
                    skills
                }
            }, err => {
                if (err) console.log(err)
                else res.send({ updated: true })
            })

        } else {

            const newSkills = new Skills({
                _id: id,
                skills
            })

            newSkills.save(err => {
                if (err) console.log(err)
                else res.send({ updated: true })
            })
        }
    })
})

router.post('/skills', (req, res) => {
    const { _id } = req.body
    
    Skills.findOne({_id: new ObjectId(_id)}, (err, doc) => {
        if (doc) res.send({skills: doc.skills})
        else res.send({skills: []})
    })
})

module.exports = router