var mongoose = require('mongoose')

var TableSchema = mongoose.Schema({
    name: { type: String },
    type: { type: String },
    description: { type: String }
});

module.exports = mongoose.model('Table', TableSchema)
