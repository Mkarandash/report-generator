var mongoose = require('mongoose')

var ChartSchema = mongoose.Schema({
    title: { type: String },
    type: { type: String },
    countBy: { type: String },
    separateBy: { type: String }
})

module.exports = mongoose.model('Chart', ChartSchema)
