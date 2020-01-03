const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const middleware = require('../Helpers/Middleware')
const filter = require('../Helpers/SearchMethods')
const { Client } = require('@elastic/elasticsearch')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post("/index", middleware.verifyToken, function (req, res, next) {
  const client = new Client({ node: req.body.elasticUrl })
  client.indices.getMapping({ index: req.body.elasticIndex }, (err, result) => {
    if (err) return res.status(400).send(err)
    else return res.send(filter.filterResults(result))
  })
})


router.post("/field", middleware.verifyToken, function (req, res, next) {
  let client = new Client({ node: req.body.project.elasticUrl })
  client.search({
    index: req.body.project.elasticIndex,
    body: {
      query: {
        bool: {
          must: [{
            bool: {
              must: [{
                bool: {
                  should: [{
                    multi_match: {
                      query: req.body.field.value,
                      fields: [req.body.field.name],
                      type: "cross_fields",
                      operator: "and"
                    }
                  },{
                    multi_match: {
                      query: req.body.field.value,
                      fields: [req.body.field.name],
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
            field: req.body.field.name + '.keyword',
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


router.post("/", middleware.verifyToken, function(req, res, next) {
  let client = new Client({ node: req.body.project.elasticUrl })
  let query = {
    size: req.body.template.size,
    query: {
      bool: {}
    }
  }
  let must = []
  let filter = []
  
  for (let field of req.body.template.fields.filter(x=>x.value || x.from || x.to)) {
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

  client.search({ index: req.body.project.elasticIndex, body: query }, (err, result) => {
    if (err) return res.status(400).send(err)
    else res.send(result.body.hits.hits.map(x => x._source))
  })
})

module.exports = router