var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.json({"chatDamage": 10, "promisesBroken": 2, "promisesKept": 0});
});

module.exports = router;
