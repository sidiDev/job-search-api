const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Create = require('../crud/Create')
const Signup = require('../modules/auth/Signup')
const router = express.Router()

const max_age = 6000000 * 15 * 5

const secret = process.env.SECRET || "I hate you as a hacker and love my self as a hacker"

const signup = (Model, data, res) => {

    new Create(Model, data).save().then(response => {
        if (response.success) {

            const token = jwt.sign({ user: response.doc }, secret, {
                expiresIn: max_age
            })
            
            res.send({ token, success: true, pathname: response.doc.role })
        }
    })
}

router.post('/signup', (req, res) => {

    const data = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        role: req.body.role
    }

    console.log(data);

    Signup.findOne({email: data.email}, (err, doc) => {
        if (doc) res.send({ success: false })
        else {

            if (req.body.role == 'company') {
                signup(Signup, data, res)
            } else {
                signup(Signup, data, res)
            }
        }
    })
})

module.exports =  router