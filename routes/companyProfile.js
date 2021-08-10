const express = require('express')
const User = require('../models/user/User')
const router = express.Router()

router.patch('/profile', (req, res) => {

    const { _id, companyName, email, members, location, about, password } = req.body
    User.updateOne({_id}, {
        companyName,
        email,
        members,
        location,
        about,
        password,
        completed: true
    }, err => {
        if (err) console.log(err)
        else res.send({updated: true})
    })

})

module.exports = router