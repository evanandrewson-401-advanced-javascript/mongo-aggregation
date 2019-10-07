const router = require('express').Router();
const Grade = require('../models/grade');

router
  .get('/', (req, res, next) => {
    Grade.aggregate([
      {
        '$unwind': {
          'path': '$scores'
        }
      }, {
        '$group': {
          '_id': {
            'class_id': '$class_id', 
            'scores_type': '$scores.type'
          }, 
          'avg': {
            '$avg': '$scores.score'
          }
        }
      }
    ])
    .then(hours => res.json(hours))
    .catch(next)
  });

  module.exports = router;