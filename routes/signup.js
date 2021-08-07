const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Create = require('../crud/Create')
const SignUp = require('../modules/Signup')
const router = express.Router()

const max_age = 6000000 * 15 * 5

const secret = process.env.SECRET || "I hate you as a hacker and love my self as a hacker"

router.post('/signup', (req, res) => {

    SignUp.findOne({email: req.body.email}, (err, doc) => {
        if (doc) res.send({ success: false })
        else {

            new Create(SignUp, {
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                role: req.body.role

            }).save().then(response => {
                if (response.success) {

                    const token = jwt.sign({ user: response.doc }, secret, {
                        expiresIn: max_age
                    })
                    
                    res.send({ token, success: true, pathname: response.doc.role })
                }
            })
        }
    })
})

module.exports =  router