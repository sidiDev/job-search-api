const express = require('express')
const ObjectId = require('mongodb').ObjectId
const Skills = require('../models/skills/Skills')
const router = express.Router()

// Add new skill
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

// Get skills
router.get('/skills/:id', (req, res) => {
    const { id } = req.params
    
    Skills.findOne({_id: new ObjectId(id)}, (err, doc) => {
        if (doc) res.send({skills: doc.skills})
        else res.send({skills: []})
    })
})

// Delete skill
router.post('/skills/:id', (req, res) => {

    const { id } = req.params

    Skills.updateOne({_id: new ObjectId(id)}, {
        $pull: { skills:  req.body.skill}
    }, err => {
        if (err) console.log(err);
        else res.send({deleted: true})
    })
})

module.exports = router