const mongoose = require('mongoose')

const schema = new mongoose.Schema(({
    _id: mongoose.Schema.Types.ObjectId,
    skills: Array
}))

const Skills = mongoose.model('skills', schema)

module.exports = Skills