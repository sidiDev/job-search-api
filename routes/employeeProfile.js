const express = require('express')
const User = require('../models/user/User')
const router = express.Router()

router.patch('/profile', (req, res) => {

    const { _id, username, jobTitle, email, number, password } = req.body
    User.updateOne({_id}, {
        username,
        jobTitle,
        email,
        number,
        password,
        completed: true
    }, err => {
        if (err) console.log(err)
        else res.send({updated: true})
    })

})

module.exports = router