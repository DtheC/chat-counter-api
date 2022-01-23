var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize');

/* GET home page. */
router.get('/', async function(req, res, next) {
  sequelize.models.Count.findAll().then(counts => {
    res.render('index', { title: 'Super Duper Counter API', counts});
  });
});

module.exports = router;
