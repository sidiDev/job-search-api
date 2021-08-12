const express = require('express')
const jwt = require('jsonwebtoken')
const Cryptr = require('cryptr')
const User = require('../models/user/User')
const router = express.Router()

const secret = process.env.SECRET || "I hate you as a hacker and love my self as a hacker"

const pass_secret = process.env.PASS_SECRET || "SIDI"

const cryptr = new Cryptr(pass_secret)

router.post('/auth', (req, res) => {

    const token = req.header('Authorization')

    
    try {
        const { user } = jwt.verify(token, secret)
        User.findOne({_id: user._id}, (err, doc) => {
            if (doc) {
                
                const {
                    _id,
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

                res.send({userData: {
                    _id,
                    avatar,
                    email,
                    username,
                    jobTitle,
                    number,
                    companyName,
                    members,
                    location,
                    about,
                    password: cryptr.decrypt(password),
                    role,
                    completed,
                    token
                }, loggedIn: true})
            }
        })
    }
    
    catch(err) {
        res.send({userData: [], loggedIn: false})
    }
})

module.exports = router