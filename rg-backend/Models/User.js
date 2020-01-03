var mongoose = require('mongoose')
var Role = require('./Role').schema

var UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  occupation: { type: String },
  country: { type: String },
  city: { type: String },
  password: { type: String },
  scopes: { type: [Role] }
}, { versionKey: false })

module.exports = mongoose.model('User', UserSchema)
