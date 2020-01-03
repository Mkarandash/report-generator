var mongoose = require('mongoose')

var ProjectSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  modifiedBy: { type: String },
  modifiedAt: { type: Date },
  createdBy: { type: String },
  createdAt: { type: Date },
  elasticUrl: { type: String },
  elasticIndex: { type: String }
}, { versionKey: false })

module.exports = mongoose.model('Project', ProjectSchema)
