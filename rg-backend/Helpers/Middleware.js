var jwt = require('jsonwebtoken')
var config = require('../config')
var User = require('../Models/User')

module.exports = {
  verifyToken: (req, res, next) => {
    var token = req.headers['x-access-token']
    if (!token) return res.status(401).send('Unauthorized')
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) return res.status(403).send('Forbidden')
      User.findById(decoded.id, function (err, user) {
        if (err) return res.status(500).send("Server error: " + err)
        if (!user) return res.status(401).send("Unauthorized")
        req.user = user
        next()
      })
    })
  },
  
  verifyUser: (req, res, next) => {
    var hasPermission = req.user.scopes.find(x => x.projectId == req.params.projectId)
    if (!hasPermission) return res.status(403).send("Permission denied")
    next()
  },
  
  verifyAdmin: (req, res, next) => {
    var hasPermission = req.user.scopes.find(x => x.projectId == req.params.projectId)
    if (!hasPermission) return res.status(403).send("Permission denied -")
    if (hasPermission.role != 'admin') return res.status(403).send("Permission denied")
    next()
  }
}
