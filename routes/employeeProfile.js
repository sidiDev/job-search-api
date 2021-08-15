const express = require('express')
const User = require('../models/user/User')
const Cryptr = require('cryptr')
const uploader = require('../uploader/uploader')
const router = express.Router()

const pass_secret = process.env.PASS_SECRET || "SIDI"

const cryptr = new Cryptr(pass_secret)

router.post('/profile/avatar', async (req, res) => {
    
    const { _id } = req.body
    const file = req.files.file.tempFilePath

    try {
        const result = await uploader(file)
        User.updateOne({_id}, {
            avatar: result.secure_url
        }, err => {
            if (err) console.log(err)
            else res.send({url: result.secure_url})
        })
    } catch (err) {
        console.log(err)
    }

})

router.patch('/profile', (req, res) => {

    const { _id, username, jobTitle, email, number, password } = req.body
    User.updateOne({_id}, {
        username,
        jobTitle,
        email,
        number,
        password: cryptr.encrypt(password),
        completed: true
    }, err => {
        if (err) console.log(err)
        else res.send({updated: true})
    })

})

module.exports = router