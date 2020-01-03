var mongoose = require('mongoose')

var RoleSchema = new mongoose.Schema({
    projectId: { type: String },
    role: { type: String, enum: ['user', 'admin'] }
})

module.exports = mongoose.model('Role', RoleSchema)
