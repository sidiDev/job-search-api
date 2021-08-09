const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Signup = require('../modules/auth/Signup')
const router = express.Router()

const max_age = 6000000 * 15 * 5

const secret = process.env.SECRET || "I hate you as a hacker and love my self as a hacker"

router.post('/login', (req, res) => {

    const { email, password } = req.body

    Signup.findOne({ email }, (err, doc) => {
        if (!doc) res.send({msg: 'This email is not exist'})
        else {
            if (!bcrypt.compareSync(password, doc.password)) res.send({msg: 'Password is not correct'})
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