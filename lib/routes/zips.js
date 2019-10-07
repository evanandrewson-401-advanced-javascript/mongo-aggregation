const router = require('express').Router();
const Zip = require('../models/zip');

router
  .get('/', (req, res, next) => {
    Zip.aggregate([
      {
        '$group': {
          '_id': '$state', 
          'pop': {
            '$sum': '$pop'
          }
        }
      }, {
        '$sort': {
          'pop': -1
        }
      }, {
        '$limit': 10
      }
    ])
    .then(states => res.json(states))
    .catch(next)
  });

  module.exports = router;