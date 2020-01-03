var mongoose = require('mongoose')

var ChartSchema = mongoose.Schema({
    name: { type: String },
    type: { type: String },
    description: { type: String }
})

module.exports = mongoose.model('Chart', ChartSchema)
