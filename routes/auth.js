const express = require('express')
const jwt = require('jsonwebtoken')
const Signup = require('../modules/auth/Signup')
const router = express.Router()

const secret = process.env.SECRET || "I hate you as a hacker and love my self as a hacker"

router.post('/auth', (req, res) => {

    const token = req.header('Authorization')

    
    try {
        const { user } = jwt.verify(token, secret)
        Signup.findOne({_id: user._id}, (err, doc) => {
            if (doc) res.send({userData: doc, loggedIn: true})
        })
    }
    
    catch(err) {
        res.send({userData: [], loggedIn: false})
    }
})

module.exports = router