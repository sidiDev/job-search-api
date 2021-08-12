const express = require('express')
const User = require('../models/user/User')
const Cryptr = require('cryptr')
const router = express.Router()

const pass_secret = process.env.PASS_SECRET || "SIDI"

const cryptr = new Cryptr(pass_secret)

router.patch('/profile', (req, res) => {

    const { _id, companyName, email, members, location, about, password } = req.body
    User.updateOne({_id}, {
        companyName,
        email,
        members,
        location,
        about,
        password: cryptr.encrypt(password),
        completed: true
    }, err => {
        if (err) console.log(err)
        else res.send({updated: true})
    })

})

module.exports = router