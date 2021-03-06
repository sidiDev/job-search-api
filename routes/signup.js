const express = require('express')
const Cryptr = require('cryptr')
const jwt = require('jsonwebtoken')
const User = require('../models/user/User')
const router = express.Router()

const max_age = 6000000 * 15 * 5

const secret = process.env.SECRET || "I hate you as a hacker and love my self as a hacker"

const pass_secret = process.env.PASS_SECRET || "SIDI"
const cryptr = new Cryptr(pass_secret)

router.post('/signup', (req, res) => {

    const data = {
        email: req.body.email,
        password: cryptr.encrypt(req.body.password),
        role: req.body.role
    }

    User.findOne({email: data.email}, (err, doc) => {
        if (doc) res.send({ success: false })
        else {

            const newModule = new User(data)
            newModule.save((err, user) => {
                if (user) {
        
                    const token = jwt.sign({ user }, secret, {
                        expiresIn: max_age
                    })
                    
                    res.send({ token, success: true, pathname: user.role })
                }
            })
        }
    })
})

module.exports =  router