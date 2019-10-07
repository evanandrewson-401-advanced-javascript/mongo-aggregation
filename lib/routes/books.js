const router = require('express').Router();
const Book = require('../models/book');

router
  .get('/', (req, res, next) => {
    Book.aggregate([
      {
        '$unwind': {
          'path': '$authors'
        }
      }, {
        '$group': {
          '_id': '$authors', 
          'avg_page_count': {
            '$avg': '$pageCount'
          }
        }
      }
    ])
    .then(pageCounts => res.json(pageCounts))
    .catch(next)
  });

  module.exports = router;