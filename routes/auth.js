const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user/User')
const router = express.Router()

const secret = process.env.SECRET || "I hate you as a hacker and love my self as a hacker"

router.post('/auth', (req, res) => {

    const token = req.header('Authorization')

    
    try {
        const { user } = jwt.verify(token, secret)
        User.findOne({_id: user._id}, (err, doc) => {
            const {
                avatar,
                email,
                username,
                jobTitle,
                number,
                companyName,
                members,
                location,
                about,
                password,
                role,
                completed,
                token
            } = doc
            if (doc) res.send({userData: doc, loggedIn: true})
        })
    }
    
    catch(err) {
        res.send({userData: [], loggedIn: false})
    }
})

module.exports = router