const express = require('express')
const jwt = require('jsonwebtoken')
const Cryptr = require('cryptr')
const User = require('../models/user/User')
const router = express.Router()

const max_age = 6000000 * 15 * 5

const secret = process.env.SECRET || "I hate you as a hacker and love my self as a hacker"
const pass_secret = process.env.PASS_SECRET || "SIDI"

const cryptr = new Cryptr(pass_secret)

router.post('/login', (req, res) => {

    const { email, password } = req.body

    User.findOne({ email }, (err, doc) => {
        if (!doc) res.send({msg: 'This email is not exist'})
        else {
            if (cryptr.decrypt(doc.password) != password) res.send({msg: 'Password is not correct'})
            else {

                const token = jwt.sign({ user: doc }, secret, {
                    expiresIn: max_age
                })

                res.send({msg: 'LogedIn successfuly', token, pathname: doc.role})
            }
        }
    })
})

module.exports = router