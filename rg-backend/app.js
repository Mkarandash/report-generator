var express = require('express')
var app = express()
var db = require('./db')
var cors = require('cors')

var UserController = require('./Controllers/UserController')
var ProjectController = require('./Controllers/ProjectController')
var TemplateController = require('./Controllers/TemplateController')
var SearchController = require('./Controllers/SearchController')

app.use(cors({origin: '*'}))
app.use('/api/users', UserController)
app.use('/api/projects', ProjectController)
app.use('/api', TemplateController)
app.use('/api/search', SearchController)

module.exports = app
