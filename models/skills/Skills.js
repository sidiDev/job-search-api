const mongoose = require('mongoose')

const schema = new mongoose.Schema(({
    _id: Object,
    skills: Array
}))

const Skills = mongoose.model('skills', schema)

module.exports = Skills