var express = require('express')
var router = express.Router({ mergeParams: true })
var bodyParser = require('body-parser')
var middleware = require('../Helpers/Middleware')
var filter = require('../Helpers/SearchMethods')
var { Client } = require('@elastic/elasticsearch')
var Project = require('../Models/Project')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/index", [middleware.verifyToken, middleware.verifyUser, middleware.getProjectData], function (req, res, next) {
  const client = new Client({ node: req.project.elasticUrl })
  client.indices.getMapping({ index: req.project.elasticIndex }, (err, result) => {
    if (err) return res.status(400).send(err)
    else return res.send(filter.filterResults(result))
  })
})

router.post("/field", [middleware.verifyToken, middleware.verifyUser, middleware.getProjectData], function (req, res, next) {
  let client = new Client({ node: req.project.elasticUrl })
  client.search({
    index: req.project.elasticIndex,
    body: {
      query: {
        bool: {
          must: [{
            bool: {
              must: [{
                bool: {
                  should: [{
                    multi_match: {
                      query: req.body.value,
                      fields: [req.body.name],
                      type: "cross_fields",
                      operator: "and"
                    }
                  },{
                    multi_match: {
                      query: req.body.value,
                      fields: [req.body.name],
                      type: "phrase_prefix",
                      operator: "and"
                    }
                  }],
                  minimum_should_match: 1
                }
              }]
            }
          }]
        }
      },
      aggs: {
        results: {
          terms: {
            field: req.body.name + '.keyword',
            size: 5
          }
        }
      }
    }
  }, (err, result) => {
    if (err) 
      res.status(400).send(err)
    else
      res.send(result.body.aggregations.results.buckets.map(x => x.key))
  })
});


router.post("/", [middleware.verifyToken, middleware.verifyUser, middleware.getProjectData], function(req, res, next) {
  let client = new Client({ node: req.project.elasticUrl })
  let query = {
    size: req.body.size,
    query: {
      bool: {}
    }
  }
  let must = []
  let filter = []
  
  for (let field of req.body.fields.filter(x=>x.value || x.from || x.to)) {
    if (field.type == "text") {
      let matchValue = {}
      matchValue[field.name] = field.value
      must.push({ match: matchValue })
    }
    else if (field.type == "date" || "long") {
      let rangeValue = {}
      rangeValue[field.name] = {
        gte: field.from ? field.from : undefined,
        lte: field.to ? field.to : undefined
      }
      filter.push({ range: rangeValue })
    }
  }

  if (must.length) {
    query.query.bool['must'] = must
  }

  if (filter.length) {
    query.query.bool['filter'] = filter
  }

  client.search({ index: req.project.elasticIndex, body: query }, (err, result) => {
    if (err) return res.status(400).send(err)
    else res.send(result.body.hits.hits.map(x => x._source))
  })
})

module.exports = router