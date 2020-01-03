var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var middleware = require('../Helpers/Middleware')
var config = require('../config')
var User = require('../Models/User')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post(
  '/register',function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8)
  User.create({ name: req.body.name, password: hashedPassword }, function (err, user) {
      if (err) return res.status(500).send("Internal Internal server error: " + err)
      var token = jwt.sign({ id: user._id }, config.secret)
      return res.status(200).send({ token: token, userId: user._id })
    })
})

router.post('/login', function (req, res) {
  User.findOne({ name: req.body.name }, function (err, user) {
    if (err) return res.status(500).send("Internal Internal server error: " + err)
    if (!user) return res.status(404).send("User not found")
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) return res.status(400).send("Invalid credentials")
    var token = jwt.sign({ id: user._id }, config.secret)
    return res.status(200).send({ token: token, userId: user._id })
  })
})

router.get('/:userId', middleware.verifyToken, function (req, res, next) {
  if (req.user._id != req.params.userId) return res.status(403).send("Permission denied")
  User.findById(req.params.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("Internal Internal server error: " + err)
    if (!user) return res.status(404).send("User not found")
    return res.status(200).send(user)
  })
})

router.put('/:userId', middleware.verifyToken, function (req, res, next) {
  if (req.user._id != req.params.userId) return res.status(403).send("Permission denied")
  User.findOneAndUpdate(req.params.userId, req.body, {new: true}, function (err, user) {
    if (err) return res.status(500).send("Internal server error: " + err)
    if (!user) return res.status(404).send("User not found")
    user.password = undefined
    return res.status(200).send(user)
  })
})

router.delete('/:userId', middleware.verifyToken, function (req, res, next) {
  if (req.user._id != req.params.userId) return res.status(403).send("Permission denied")
  User.findOneAndRemove({ _id: req.params.id }, function (err, user) {
    if (err) return res.status(500).send("Internal server error: " + err)
    if (!user) return res.status(404).send("User not found")
    return res.status(200).send("User has been deleted")
  })
})

/*
router.post('/:id/scopes', VerifyToken, function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, {$push: {scopes: {projectId: req.body.projectId, role: req.body.role}}}, function(err, user) {
    if (err) return res.status(500).send("Internal server error: " + err);
    if (!user) return res.status(404).send("User not found");
    if (!(user.scopes.length > 0)) return res.status(403).send("Permission denied");
    if (!(user.scopes.filter(x=>x.projectId == req.body.projectId)[0].role == 'admin')) return res.status(403).send("Permission denied");
    return res.status(200).send("Access " + req.body.role + " granted to user " + req.params.id + " to the project " + req.body.projectId);
  });
});
*/

module.exports = router;