var mongoose = require('mongoose')

var FieldSchema = mongoose.Schema({
    name: { type: String },
    displayName: { type: String },
    isSearchable: { type: Boolean },
    isDisplayable: { type: Boolean },
    value: { type: Object },
    defaultValue: { type: Object },
    gte: { type: Object },
    lte: { type: Object },
    type: { type: String, enum: ['text', 'long', 'date'] },
    description: { type: String }
})

module.exports = mongoose.model('Field', FieldSchema)
