var mongoose = require('mongoose')

var HistorySchema = new mongoose.Schema({
  performedBy: { type: String },
  performedAt: { type: Date, default: Date.now() },
  templateId: { type: String }
}, { versionKey: false })

module.exports = mongoose.model('History', HistorySchema)
