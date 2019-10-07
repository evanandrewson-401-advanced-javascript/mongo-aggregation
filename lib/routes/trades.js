const router = require('express').Router();
const Trade = require('../models/trade');

router
  .get('/', (req, res, next) => {
    Trade.aggregate([
      {
        '$project': {
          'hour': {
            '$hour': '$time'
          }, 
          'shares': '$shares', 
          'ticker': '$ticker'
        }
      }, {
        '$group': {
          '_id': '$hour', 
          'trades': {
            '$sum': '$shares'
          }
        }
      }
    ])
    .then(hours => res.json(hours))
    .catch(next)
  });

  module.exports = router;