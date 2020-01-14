var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var middleware = require('../Helpers/Middleware')
var User = require('../Models/User')
var Project = require('../Models/Project')
var Template = require('../Models/Template')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

router.get('/', middleware.verifyToken, function (req, res, next) {
var projectIds = req.user.scopes.map(x => x.projectId)
  Project.find({ '_id' : { $nin: projectIds } }, { modifiedBy: 0, modifiedAt: 0, elasticUrl: 0, elasticIndex: 0 }, function (err, project) {
    if (err) return res.status(500).send("Internal server error: " + err)
    return res.status(200).send(project)
  })
})

router.post('/', middleware.verifyToken, function (req, res, next) {
  req.body.createdBy = req.user._id
  req.body.createdAt = new Date().toISOString()
  Project.create(req.body, function(err, project) {
    if (err) return res.status(500).send("Internal server error: " + err)
    User.findByIdAndUpdate(req.user._id, { $push: { scopes: { projectId: project._id, role: 'admin' } } }, function(err, user) {
      if (err) return res.status(500).send("Internal server error: " + err)
      return res.status(200).send(project)
    })
  })
})

router.get('/:projectId', [middleware.verifyToken, middleware.verifyUser], function (req, res, next) {
  Project.findById(req.params.projectId, function(err, project) {
    if (err) return res.status(500).send("Internal server error: " + err);
    if (!project) return res.status(404).send("Project not found")
    return res.status(200).send(project)
  })
})

router.put('/:projectId', [middleware.verifyToken, middleware.verifyAdmin], function (req, res, next) {
  req.body.modifiedBy = req.user._id
  req.body.modifiedAt = new Date().toISOString()
  Project.findByIdAndUpdate(req.params.projectId, req.body, {new: true}, function (err, project) {
    if (err) return res.status(500).send("Internal server error: " + err)
    return res.status(200).send(project)
  })
})

router.delete('/:projectId', [middleware.verifyToken, middleware.verifyAdmin], function (req, res, next) {
  Project.findOneAndRemove({ _id: req.params.projectId }, function (err, project) {
    if (err) return res.status(500).send("Internal server error: " + err)
    Template.remove({ projectId: req.params.projectId }, function (err, template) {
      if (err) return res.status(500).send("Internal server error: " + err)
      return res.status(200).send("Project has been deleted")
    })
  })
})

router.get('/user/:projectId', middleware.verifyToken, function (req, res, next) {
  var projectIds = req.user.scopes.map(x => x.projectId)
  Project.find({'_id': { $in: projectIds } }, { modifiedBy: 0, modifiedAt: 0, elasticUrl: 0, elasticIndex: 0 }, function (err, project) {
    if (err) return res.status(500).send("Internal server error: " + err)
    return res.status(200).send(project)
  })
})

module.exports = router;