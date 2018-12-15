var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/orders', function(req, res, next) {
  res.status(200).send('test orders');
});

module.exports = router;
