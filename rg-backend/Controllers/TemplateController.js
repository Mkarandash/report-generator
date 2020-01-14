var express = require('express')
var router = express.Router({ mergeParams: true })
var bodyParser = require('body-parser')
var middleware = require('../Helpers/Middleware')
var Template = require('../Models/Template')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', [middleware.verifyToken, middleware.verifyAdmin], function (req, res, next) {
  Template.create(req.body, function (err, template) {
    if (err) return res.status(500).send("Internal server error: " + err)
    return res.status(200).send(template)
  })
})

router.get('/:templateId', [middleware.verifyToken, middleware.verifyUser], function (req, res, next) {
  Template.findById(req.params.templateId, function (err, template) {
    if (err) return res.status(500).send("Internal server error: " + err)
    return res.status(200).send(template)
  })
})

router.put('/:templateId', [middleware.verifyToken, middleware.verifyAdmin], function (req, res, next) {
  Template.findByIdAndUpdate(req.params.templateId, req.body, {new: true}, function (err, template) {
    if (err) return res.status(500).send("Internal server error: " + err)
    return res.status(200).send(template)
  })
})

router.delete('/:templateId', [middleware.verifyToken, middleware.verifyAdmin], function (req, res, next) {
  Template.findOneAndRemove({_id: req.params.templateId}, function (err, template) {
    if (err) return res.status(500).send("Internal server error: " + err)
    return res.status(200).send("Template " + template._id + " deleted")
  })
})

router.get('/', [middleware.verifyToken, middleware.verifyUser], function (req, res, next) {
  Template.find({projectId: req.params.projectId}, function (err, template) {
    if (err) return res.status(500).send("Internal server error: " + err)
    return res.status(200).send(template)
  })
})

module.exports = router