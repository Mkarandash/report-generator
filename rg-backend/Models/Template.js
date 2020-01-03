var mongoose = require('mongoose')
var Field = require('./Field').schema
var Table = require('./Table').schema
var Chart = require('./Chart').schema

var TemplateSchema = new mongoose.Schema({
  name: { type: String },
  projectId: { type: String },
  description: { type: String },
  modifiedBy: { type: String },
  modifiedAt: { type: Date },
  createdBy: { type: String },
  createdAt: { type: Date },
  size: { type: Number },
  fields: [{ type: Field }],
  tables: [{ type: Table }],
  charts: [{ type: Chart }]
}, { versionKey: false })

module.exports = mongoose.model('Template', TemplateSchema)
