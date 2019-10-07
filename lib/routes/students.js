const router = require('express').Router();
const Student = require('../models/student');

router
  .get('/', (req, res, next) => {
    Student.aggregate([
      {
        '$unwind': {
          'path': '$scores'
        }
      }, {
        '$sort': {
          'scores.score': 1
        }
      }, {
        '$group': {
          '_id': '$scores.type', 
          'avg': {
            '$avg': '$scores.score'
          }, 
          'min': {
            '$first': '$scores.score'
          }, 
          'max': {
            '$last': '$scores.score'
          }
        }
      }
    ])
    .then(scores => res.json(scores))
    .catch(next)
  });

  module.exports = router;